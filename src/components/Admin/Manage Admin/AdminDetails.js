import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../url/url";
import Moment from "moment";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import ReactPaginate from "react-paginate";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


const AdminDetails = () => {
  const [data, getData] = useState("");
  const [type, setType] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [applicationlist, getApplicationList] = useState([]);
  const [totalAppuser, getTotalAppuser] = useState([]);
  const [merchantdata, getMerchantdata] = useState([]);
  const [isOn, setIsOn] = useState(false)


  // Pagination

  const [pageNumber, setPageNumber] = useState(0);
  

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(applicationlist.length / usersPerPage);
  const appUsersPageCount = Math.ceil(totalAppuser.length / usersPerPage)
  const merchantsPageCount = Math.ceil(merchantdata.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  

  const { id } = useParams();
  useEffect(() => {
    admindetails();
  }, []);

  const admindetails = async () => {
    let request = { id: id };
    console.log(request);
    await axios
      .post(URL + "/manageadmindetails", request, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        // console.log(res.data.data)
        getData(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };
  console.log(data);

  // Get Merchant Data API

 
  useEffect(() => {
    getMerchantdetails();
  }, []);

  const getMerchantdetails = async () => {
    let req = {
      id: id,
      user_type: 2,
    };

    await axios
      .post(URL + "/admin/getmerchantdata", req, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        getMerchantdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //GetApplicationList API

  

  useEffect(() => {
    getApplication();
  }, []);

  const getApplication = async () => {
    let reqq = {
      id: id,
    };
    console.log("id");
    console.log(reqq);
    await axios
      .post(URL + "/getadminapplicationlist", reqq, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        getApplicationList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // get Admin total App user Api

  

  useEffect(() => {
    getAppuser();
  }, []);

  const getAppuser = async () => {
    let req1 = { ownerID: id };
    console.log(req1);
    await axios
      .post(URL + "/get-app-user", req1, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        getTotalAppuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(totalAppuser)

  const handleStatus = async (status,usersID) =>{
    var getStatus = 1;
    if(status == 0)
    {
      getStatus = 1
    }
    else{
      getStatus = 0
    }

  
   
    console.log(status+" , "+usersID);
    const request = {
                    'id':usersID,
                    'status':getStatus
                    };
                    console.log("update status status status")
                    console.log(request)
                   
   await axios.post(URL + "/updateAppUser",request)
    .then((res)=>{
        console.log(res)
        // getAppuser()
    }).catch((err)=>{
      console.log(err)
    })
  
    
  }

  return (
    <div class="page-wrapper" style={{ minHeight: "250px" }}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="application-detail-heading-area">
              <h2>Admin Details</h2>
            </div>
            <div class="admin-detail-main-area">
              <div class="row">
                <div class="col-lg-6">
                  <div class="admin-detail-list-area">
                    <div class="admin-name-img-area">
                      {/* <div class="admin-detail-img-area">
                      <img src="images/demo-logo.png" alt="logo"/>  
                      </div> */}
                      <div class="admin-name-area">
                        <h4>{data.name}</h4>
                      </div>
                    </div>
                    <div class="admin-contact-detail-area">
                      <h4>
                        Email: <span>{data.email}</span>
                      </h4>
                      <h4>
                        Phone: <span>{data.phone_number}</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="admin-contact-detail-area">
                    <h4>
                      Date:{" "}
                      <span>
                        {Moment(data.created_at).format("DD-MM-YYYY HH:mm")}
                      </span>
                    </h4>
                    <h4>
                      Number Of Apps: <span>{data.appcount}</span>
                    </h4>
                    <h4>
                      Plan: <span>Basic</span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-12">
            <div className="notification-list-rve-send-area">
              <div className="admin-appuser-application-marchent">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setType(1)}
                      className={
                        type == 1
                          ? "nav-link tab-btn  active"
                          : "nav-link tab-btn "
                      }
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="false"
                    >
                      <i class="fa fa-user-plus" aria-hidden="true"></i>App
                      Users
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setType(2)}
                      className={
                        type == 2
                          ? "nav-link tab-btn  active"
                          : "nav-link tab-btn "
                      }
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      <i class="fa fa-mobile" aria-hidden="true"></i>Application
                      Lists
                    </button>
                  </li>

                  <li className="nav-item" role="presentation">
                    <button
                      onClick={() => setType(3)}
                      className={
                        type == 3
                          ? "nav-link tab-btn  active"
                          : "nav-link tab-btn "
                      }
                      id="contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#contact"
                      type="button"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                      class="nav-link tab-btn"
                    >
                      <i class="fa fa-users" aria-hidden="true"></i>Merchants
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="table-data-search-box"
              style={{
                position: "relative",
                width: "250px",
                left: "790px",
                top: "115px",
              }}
            >
              <div className="search">
                <input
                  type="text"
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="searchTerm"
                  placeholder="Search"
                />
                <button type="submit" className="searchButton">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div
              className="tab-content"
              id="myTabContent"
              style={type == 1 ? { display: "block" } : { display: "none" }}
            >
              <div
                className={
                  type == 1 ? "tab-pane fade active show" : "tab-pane fade"
                }
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="app-user-main-heading-area">
                  <h2>App Users</h2>
                </div>
                <div class="admin-appuser-table-area">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Users Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Country</th>
                        <th>Auth Method</th>
                        {/* <th>Action</th> */}
                        <th>Active/Inactive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {totalAppuser.filter(
                          (row) =>
                            !searchValue.length ||
                            row.name
                              .toString()
                              .toLowerCase()
                              .includes(searchValue.toString().toLowerCase()),
                        ).slice(pagesVisited, pagesVisited + pageCount) 
                        .map((value, i) => (
                          <tr>
                            <td>{i + pagesVisited + 1}</td>
                            <td>
                              <div class="user-icon-detail-area">
                                {/* <div class="user-icon-area">
                           <i class="fa fa-user" aria-hidden="true"></i>
                          </div> */}
                                <div class="user-name-area">
                                  <h5>
                                    <a href="#">{value.name}</a>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{value.email}</td>
                            <td>{value.phone}</td>
                            <td>{value.country}</td>
                            <td>
                              <div class="face-img-area">
                                <img src="demo-face.jpg" alt="demo face" />
                              </div>
                            </td>
                            {/* <td>
                            <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                            <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                        </td> */}
                            <td>
                            <button type="button" className="subscription-plan-custmize-btn" onClick={()=>{handleStatus(value.status, value.id)}}>{value.status == 1 ? 'Active' : 'Inactive'}</button>
                               
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div style={{display:totalAppuser.length > 5 ? 'block' : 'none'}}>
                  <ReactPaginate 
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={appUsersPageCount}
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

            <div
              className={
                type == 2 ? "tab-pane fade show active" : "tab-pane fade"
              }
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
              style={type == 2 ? { display: "block" } : { display: "none" }}
            >
              <div class="app-user-main-heading-area">
                <h2>Application Lists</h2>
              </div>
              <div class="admin-appuser-table-area">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Applications Name</th>
                      <th>Created On</th>
                      <th>Admin/Merchants</th>
                      <th>App Users</th>
                      <th>View Details</th>
                      {/* <th>Action</th> */}
                      <th>Active/Inactive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationlist.filter(
                        (row) =>
                          !searchValue.length ||
                          row.application_name
                            .toString()
                            .toLowerCase()
                            .includes(searchValue.toString().toLowerCase()),
                      ).slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((item, i) => (
                        <tr>
                          <td class="srial-number">{i + pagesVisited + 1}</td>
                          <td>
                            <div class="user-icon-detail-area">
                              {/* <div class="user-icon-area">
                           <img src="images/demo-mobile-icon.png" alt="mobile icon"/>
                          </div> */}
                              <div class="user-name-area">
                                <h5>
                                  <Link
                                    to={`/app/application-detail/${item.id}`}
                                  >
                                    {item.application_name}
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          </td>
                          <td>
                            {moment(item.created_at).format("DD-MM-YYYY HH:mm")}
                          </td>
                          <td>
                            <div class="user-icon-detail-area">
                              {/* <div class="company-user-icon-area">
                           <img src="images/demo-logo.png" alt="company logo"/>
                          </div> */}
                              <div class="user-name-area">
                                <h5>
                                  <a href="#">{item.name}</a>
                                </h5>
                              </div>
                            </div>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            {item.appUser}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Link
                              to={`/app/application-detail/${item.id}`}
                              class="mange-admins-edit-btn"
                            >
                              <i class="fas fa-eye"></i>
                            </Link>
                          </td>
                          <td>
                            {/* <div class="onoffswitch">
                              <input
                                type="checkbox"
                                name="onoffswitch"
                                class="onoffswitch-checkbox"
                                id="application-list-1"
                                checked=""
                              />
                              <label
                                class="onoffswitch-label"
                                for="application-list-1"
                              >
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                              </label>
                            </div> */}
                             <BootstrapSwitchButton
                                  // checked={app.status}
                                  onlabel="Active"
                                  offlabel="Inactive"
                                  onstyle="success"
                                  onChange={() => {
                                    setIsOn(!isOn);
                                  }}
                                />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div style={{display:applicationlist.length > 5 ? 'block' : 'none'}} >
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
            {/* </div> */}

            <div
              className={
                type == 3 ? "tab-pane fade show active" : "tab-pane fade"
              }
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"
              style={type == 3 ? { display: "block" } : { display: "none" }}
            >
              <div class="app-user-main-heading-area">
                <h2>Merchants</h2>
              </div>
              <div class="admin-appuser-table-area">
                <table class="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Merchants</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Created On</th>
                      <th>View Details</th>
                      {/* <th>Action</th> */}
                      <th>Active/Inactive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {merchantdata.filter(
                        (row) =>
                          !searchValue.length ||
                          row.name
                            .toString()
                            .toLowerCase()
                            .includes(searchValue.toString().toLowerCase()),
                      ).slice(pagesVisited, pagesVisited + usersPerPage)
                     
                      .map((item, i) => (
                        <tr>
                          <td style={{ textAlign: "center" }}>{i + pagesVisited + 1}</td>
                          <td>
                            <div class="user-icon-detail-area">
                              {/* <div class="company-user-icon-area">
                            <img src="images/demo-logo.png" alt="company logo"/>
                          </div> */}
                              <div class="user-name-area">
                                <h5>
                                  <Link to={`/app/merchant-detail/${item.id}`}>
                                    {item.name}
                                  </Link>
                                </h5>
                              </div>
                            </div>
                          </td>
                          <td>{item.email}</td>
                          <td>{item.phone_number}</td>
                          <td>
                            {moment(item.created_at).format("DD-MM-YYYY HH:mm")}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <Link
                              to={`/app/merchant-detail/${item.id}`}
                              class="mange-admins-edit-btn"
                            >
                              <i class="fas fa-eye"></i>
                            </Link>
                          </td>
                          {/* <td>
                            <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                            <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                        </td> */}
                          <td>
                            {/* <div class="onoffswitch">
                              <input
                                type="checkbox"
                                name="onoffswitch"
                                class="onoffswitch-checkbox"
                                id="merchant-1"
                                checked
                              />
                              <label class="onoffswitch-label" for="merchant-1">
                                <span class="onoffswitch-inner"></span>
                                <span class="onoffswitch-switch"></span>
                              </label>
                            </div> */}
                             <BootstrapSwitchButton
                                  checked={item.updateStatus}
                                  onClick={handleStatus(item.updateStatus, item.id)}
                                  onlabel="Active"
                                  offlabel="Inactive"
                                  onstyle="success"
                                  onChange={() => {
                                    setIsOn(!isOn);
                                  }}
                                />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div style={{display: merchantdata.length > 5 ? 'block': 'none'}}>
                <ReactPaginate 
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={merchantsPageCount}
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
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>

      <footer class="footer text-center">
        {" "}
        2021 © Ample Admin brought to you by{" "}
        <a href="https://www.wrappixel.com/">wrappixel.com</a>
      </footer>
    </div>
  );
};

export default AdminDetails;
