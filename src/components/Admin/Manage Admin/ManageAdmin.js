import React, { useState, useEffect } from "react";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Moment from "moment";
import { URL } from "../../../url/url";
import { Link, useParams } from "react-router-dom";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
import { height } from "@mui/system";

const ManageAdmin = () => {
  const [data, getData] = useState([]);
  const [copydata,setCopyData] = useState([])
  const [search, setSearch] = useState("");
  const { id } = useParams();
  // const [isOn, setIsOn] = useState("false");
  const [updateStatus, setUpdateStatus] = useState(0)

  //pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const fetchData = async() => {
    await axios
      .get(URL + "/manageadmins", {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        getData(res.data.data);
        setCopyData(res.data.data)
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //Admin Data Delete Api

  const adminDataDelete = (th) => {
    axios
      .post(URL + "/admindatadelete", { id: th })
      .then((res) => {
        // console.log(res);
        toast.warn("data deleted successfully");
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    console.log(th);

    alert("data deleted successfully");
    adminDataDelete(th);
  };

  const handleStatus = async(updateStatus, usersID) => {
    // alert();
    var getStatus = "";
    if (updateStatus === 0) {
      getStatus = 1;
    } else {
      getStatus = 0;
    }

    //console.log(updateStatus+" , "+usersID);
    const request = {
      id: usersID,
      updateStatus: getStatus,
    };

    await axios
      .post(URL + "/updateStatus", request)
      .then((res) => {
        //console.log(res)
          fetchData()
      })
      .catch((err) => {
        console.log(err);
      });
  };



  //Function for filter 

  const FilterData = (e)=>{
    setSearch(e.target.value)
   
  }


  

  

  

  return (
    
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="application-detail-heading-area"
                style={{ position: "relative", padding: "20px", top: "20px" }}
              >
                <h2>Manage Admins</h2>
                <a href="#/app/add-admin" class="send-notifications-btn">
                  Add Admin
                </a>
              </div>
              <div className="table-data-search-box">
                <div className="search">
                  <input
                    type="text"
                    onChange={(e) => FilterData(e)}
                    className="searchTerm"
                    placeholder="Search"
                  />
                  <button  type="submit" className="searchButton">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>

              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                 <div className="manage-admins-table-responsive table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Admins</th>
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
                      {data
                      .filter(
                          (row) =>
                            !search.length ||
                            row.name
                              .toString()
                              .toLowerCase()
                              .includes(search.toString().toLowerCase()),
                        )
                        .slice(pagesVisited, pagesVisited + usersPerPage)
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
                                    <Link to={`/app/admin-details/${item.id}`}>
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
                                to={`/app/admin-details/${item.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-eye"></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/app/edit-admin/${item.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <Link
                                to={`/app/admin/`}
                                datalist={item.id}
                                onClick={(e) => handleremove(e, item.id)}
                                className="mange-admins-dlt-btn"
                              >
                                {" "}
                                <DeleteForever style={{ color: "#FF5C93" }} />
                              </Link>
                            </td>
                            <td>
                              {/* <div className="onoffswitch">
                               
                                <input
                                  type="checkbox"
                                  name="onoffswitch"
                                  className="onoffswitch-checkbox"
                                  id="myonoffswitch-1"
                                  checked
                                />
                                <label
                                  className="onoffswitch-label"
                                  for="myonoffswitch-1"
                                >
                                  <span className="onoffswitch-inner"></span>
                                  <span className="onoffswitch-switch"></span>
                                </label>
                               
                              </div> */}
                              
                              
                                 {/* <BootstrapSwitchButton
                                 checked={item.updateStatus}
                                  onClick={()=>handleStatus()}
                                  onlabel="Active"
                                  offlabel="Inactive"
                                  onstyle="success"
                                  // onChange={() => {
                                  //   setUpdateStatus(!updateStatus);
                                  // }}
                                  
                                />  */}
                                 <button onClick={()=>handleStatus(item.updateStatus,item.id)} className="subscription-plan-custmize-btn">{item.updateStatus==1?'Active':'Inactive'}</button>
                                 

                              
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  </div>
                  <div style={{ display: data.length > 5 ? "block" : "none" }}>
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

{/* <Stack spacing={4}>
      <Pagination count={200}
      // previousLabel={"Previous"}
      // nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={changePage}
       />
      
    </Stack> */}




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
    
  );
};

export default ManageAdmin;
