import React,{useState,useEffect} from "react";
import DeleteForever from '@material-ui/icons/DeleteForever';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import Moment from 'moment'
import { Link } from "react-router-dom";
import { URL } from "../../../url/url";
import axios from "axios";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";

const ManageMerchants = () => {

    const[data,getData] = useState([]);
    const [activeInactive,setActiveInactive] = useState(true)
    const [search, setSearch] = useState("")


    //Pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
    

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData = async()=> {
        let request = {
            'user_type': 2,
            'user_id': localStorage.getItem('superAdminId')

        }
        //console.log(request)

        await axios.post(URL + '/managemerchants',request,{
            Accept: 'Application/json',
            'Content-Type': 'Application/json',
        }).then((res)=>{
            getData(res.data.data)
        }).catch((err)=>{
            console.log(err)
        })
        
 
    }
    //console.log(data)


    // Delete Merchant Data Api
    const deleteMerchantData = async(th)=>{
        await axios.post( URL + '/deletemerchant',{id:th}).then((res)=>{
            //console.log(res)
            fetchData()
        }).catch(err=>console.log(err))

    }


    const handleremove = (e,th)=>{
      toast.success('Merchant Deleted Successfully')
        deleteMerchantData(th)
    }

    // status changed
    const handleStatus = async (updateStatus, usersID) =>{
      var getStatus;
      if(updateStatus == 0)
      {
        getStatus = 1
      }
      else{
        getStatus = 0
      }
      
      console.log(getStatus+" , "+usersID);
      const request = {
                      'id':usersID,
                      'updateStatus':getStatus
                      };
                      
                     
     await axios.post(URL + "/updateStatus",request)
      .then((res)=>{
         //console.log(res)
          fetchData()
      }).catch((err)=>{
        console.log(err)
      })
    
      // updateSubscriptionStatus
    }
    return (
      <>
        <div className="page-wrapper" style={{ minHeight: "250px" }}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div
                  className="application-detail-heading-area"
                  style={{ position: "relative", padding: "20px", top: "20px" }}
                >
                  <h2>Manage Merchants</h2>
                  <a
                    href="#/app/add-merchant"
                    className="send-notifications-btn"
                  >
                    Add Merchants
                  </a>
                </div>
                <div className="table-data-search-box">
                  <div className="search">
                    <input
                      type="text"
                      onChange={(e) => setSearch(e.target.value)}
                      className="searchTerm"
                      placeholder="Search"
                    />
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>

                {/* 
                            <div>
                                <div>
                                <a
                                    href="#/app/add-merchant"
                                
                                    className="contact-form-submint-btn"
                                  >
                                    Add Merchants
                                  </a>
                                </div>

                            </div> */}

                <div className="manage-admins-main-area">
                  <div className="manage-admins-table-area">
                  <div className="manage-admins-table-responsive table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Merchants</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Created On</th>
                          <th>Apps</th>
                          <th>View Details</th>
                          <th>Action</th>
                          <th>Active/Inactive</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.filter(
                            (row) =>
                              !search.length ||
                              row.name
                                .toString()
                                .toLowerCase()
                                .includes(search.toString().toLowerCase()),
                          ).slice(pagesVisited, pagesVisited + usersPerPage)
                          .map((item, i) => (
                            <tr key={i}>
                              <td>{i + pagesVisited + 1}</td>
                              <td>
                                <div className="user-icon-detail-area">
                                  <div className="company-user-icon-area">
                                    <img
                                      src={
                                        item.company_image==='' || item.company_image === null?
                                        process.env.PUBLIC_URL +
                                        "/assets/images/demo-logo.png" : item.company_image
                                        
                                      }
                                      alt="company logo"
                                    />
                                  </div>
                                  <div className="user-name-area">
                                    <h5>
                                      <Link
                                        to={`/app/merchant-details/${item.id}`}
                                      >
                                        {item.name}
                                      </Link>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>{item.email}</td>
                              <td>{item.phone_number}</td>
                              <td>
                                {Moment(item.created_at).format(
                                  "DD-MM-YYYY HH:mm",
                                )}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {item.appcount}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <Link
                                  to={`/app/merchant-details/${item.id}`}
                                  className="mange-admins-edit-btn"
                                >
                                  <i className="fas fa-eye"></i>
                                </Link>
                              </td>
                              <td>
                                <Link
                                  to={`/app/edit-merchant/${item.id}`}
                                  className="mange-admins-edit-btn"
                                >
                                  <i className="fas fa-edit"></i>
                                </Link>
                                <a
                                  href="javascript: void(0);"
                                  datalist={item.id}
                                  onClick={(e) => handleremove(e, item.id)}
                                  className="mange-admins-dlt-btn"
                                >
                                  <DeleteForever style={{ color: "#FF5C93" }} />
                                </a>
                              </td>
                              <td>
                                <button type="button" className="subscription-plan-custmize-btn" onClick={()=>handleStatus(item.updateStatus, item.id)}>{item.updateStatus == 1 ? 'Active' : 'Inactive'}</button>

                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    </div>
                    <div style={{display: data.length > 5 ? 'block' : 'none'}}>
                    <ReactPaginate
                      previousLabel={"Previous"}
                      nextLabel={"Next"}
                      pageCount={pageCount}
                      onPageChange={changePage}
                      containerClassName={"paginationBttns"}
                      previousLinkClassName={"previousBttn"}
                      nextLinkClassName={"nextBttn"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"paginationActive"}
                    />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer text-center">
            {" "}
            2021 © Ample Admin brought to you by{" "}
            <a href="https://www.wrappixel.com/">wrappixel.com</a>
          </footer>
        </div>
      </>
    );
};

export default ManageMerchants;
