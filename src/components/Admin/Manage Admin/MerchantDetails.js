import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { URL } from "../../../url/url";
import ReactPaginate from "react-paginate";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

const MerchantDetail = () => {
  const [type, setType] = useState(1);
  const [details, getDetails] = useState([]);
  const [applicationlist, getApplicationList] = useState([]);
  const [appuser, getAppuser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();
  const [isOn, setIsOn] = useState(false)

  //Pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(applicationlist.length / usersPerPage);
  const appUsersPageCount = Math.ceil(appuser.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getMerchantDetails();
  }, []);

  const getMerchantDetails = async () => {
    let req = {
      id: id,
      user_type: 2,
    };
    console.log(req);
    await axios
      .post(URL + "/getmerchantdetails", req, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        console.log(res);
        getDetails(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(details)

  // Get MerchantApplist API

  useEffect(() => {
    getMerchantApplication();
  }, []);

  const getMerchantApplication = async () => {
    let reqq = {
      id: id,
    };

    await axios
      .post(URL + "/getadminapplicationlist", reqq, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        console.log("applicationList");
        console.log(res);
        getApplicationList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(applicationlist);

  // Get App user APi

  useEffect(() => {
    getAppUserList();
  }, []);

  const getAppUserList = async () => {
    let req1 = { ownerID: id };
    await axios
      .post(URL + "/get-app-user", req1, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        console.log("Merchant App users");
        console.log(res);
        getAppuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //console.log(appuser);

  return (
    <div class="page-wrapper" style={{ minHeight: "250px" }}>
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-12">
            <div class="application-detail-heading-area">
              <h2>Merchant Details</h2>
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
                        <h4>{details.name}</h4>
                      </div>
                    </div>
                    <div class="admin-contact-detail-area">
                      <h4>
                        Email: <span>{details.email}</span>
                      </h4>
                      <h4>
                        Phone: <span>{details.phone_number}</span>
                      </h4>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="admin-contact-detail-area">
                    <h4>
                      Date:{" "}
                      <span>
                        {moment(details.created_at).format("DD-MM-YYYY HH:mm")}
                      </span>
                    </h4>
                    <h4>
                      Number Of Apps: <span>{details.appcount}</span>
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
                </ul>
              </div>
            </div>
            <div
              className="table-data-search-box"
              style={{
                position: "relative",
                width: "250px",
                bottom: "60px",
                left: "795px",
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
                        <th>Active/Inactive</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appuser.filter(
                          (item) =>
                            !searchValue.length ||
                            item.name
                              .toString()
                              .toLowerCase()
                              .includes(searchValue.toString().toLowerCase()),
                        ).slice(pagesVisited, pagesVisited + usersPerPage)
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
                            <td>
                              {/* <div class="onoffswitch">
                                <input
                                  type="checkbox"
                                  name="onoffswitch"
                                  class="onoffswitch-checkbox"
                                  id="myonoffswitch-1"
                                  checked
                                />
                                <label
                                  class="onoffswitch-label"
                                  for="myonoffswitch-1"
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
                  <div style={{display: appuser.length > 5 ? 'block' : 'none'}}>
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
                    {applicationlist.filter((value)=>!searchValue.length || value.application_name
                      .toString().toLowerCase().includes(searchValue.toString().toLowerCase()))
                      .slice(pagesVisited, pagesVisited + usersPerPage)
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
                                  <a href="activity-setup.html">
                                    {item.application_name}
                                  </a>
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
                <div style={{display: applicationlist.length > 5 ? 'block': 'none'}}>
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

export default MerchantDetail;
