import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../../url/url";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import CircularProgress from '@mui/material/CircularProgress';

const ManageMerchants = () => {
  const [data, getData] = useState([]);
  const [isOn, setIsOn] = useState(false)

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setTimeout(()=>{
      getMerchantData()
  
    },1000)
    
  }, []);

  

  const getMerchantData = async () => {
    let req = {
      user_type: 2,
      user_id: localStorage.getItem("superAdminId"),
    };
    await axios
      .post(URL + "/getmerchant", req, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        //console.log(res);
        getData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
 

  // Delete Merchant Data API

  const DeleteMerchant = async (th) => {
    await axios
      .post(URL + "/admin/deletemerchant", { id: th })
      .then((res) => {
        getMerchantData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    alert("Data Deleted Successfully");
    DeleteMerchant(th);
  };

  // Serching Table Data
  const [search, setSearch] = useState("");


  // Update Merchant Status
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
        getMerchantData()
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="application-detail-heading-area"
                style={{ position: "relative", top: "20px", padding: "20px" }}
              >
                <h2>Manage Merchants</h2>
                <a
                  href="#/app/admin/add-merchant"
                  class="send-notifications-btn"
                >
                  ADD MERCHANT
                </a>
              </div>
              <div className="table-data-search-box">
                <div className="search">
                  <input
                    type="text"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    className="searchTerm"
                    placeholder="Search"
                  />
                  <button type="submit" className="searchButton">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
              
              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                  <div className="manage-admins-table-responsive table-responsive">
                  <table className="table">
                  {data.length === 0 ? (<div style={{position:'absolute',left:'50%', color: 'pink'}}><CircularProgress disableShrink /></div>) : ''}
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
                          <tr>
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
                                      to={`/app/admin/merchant-details/${item.id}`}
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
                              {moment(item.created_at).format(
                                "DD-MM-YYYY HH:mm",
                              )}
                            </td>
                            <td>{item.appcount}</td>
                            <td>
                              <Link
                                to={`/app/admin/merchant-details/${item.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-eye"></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/app/admin/edit-merchant/${item.id}`}
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
                                <i className="far fa-trash-alt"></i>
                              </a>
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
                                  // checked={app.status}
                                  onlabel="Active"
                                  offlabel="Inactive"
                                  onstyle="success"
                                  onChange={() => {
                                    setIsOn(!isOn);
                                  }}
                                /> */}
                                 <button type="button" onClick={()=>handleStatus(item.updateStatus,item.id)} className="subscription-plan-custmize-btn">{item.updateStatus==1?'Active':'Inactive'}</button>
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
