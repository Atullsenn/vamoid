import React, { useState, useEffect } from "react";
import {
  getApplicationDetail,
  updateApplicationSetup,
  getApplicationAppUserList,
  addMetaData,
  getMetaDataList,
  getEditMetaData,
  getTransactionRecord,
  deleteMetaData,
} from "./Service";
import { useHistory, useParams } from "react-router-dom";
import Switch from "../../common/Switch";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { URL } from "../../../url/url";
import Modal from "react-bootstrap/Modal";
import ReactPaginate from "react-paginate";
import moment from "moment";
import { unstable_createMuiStrictModeTheme } from "@material-ui/core";
const initialValue = {
  application_name: "",
  applicationID: "",
  publicKey: "",
  privateKey: "",
  secretID: "",
  emailEnable: "",
  phoneWhatsEnable: "",
  blockChain: "",
  faceRecognitionBiometric: "",
  redirectUrl: "",
  sessionExpirationTime: "",
  domainName: "",
  ipAddressMatch: "",
  privacyPolicy: "",
  tersmsOfUse: "",
  description: "",
  appLogo: "",
};

const ApplicationDetails = () => {
  const history = useHistory();
  const [activity, setActivity] = useState("active");
  const [setup, setSetup] = useState("");
  const [metadata, setMeatadata] = useState("");
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoader, setisLoader] = useState("none");
  const [contentActivity, setcontentActivity] = useState("active show");
  const [contentSetup, setContentSetup] = useState("");

  const [metadataActivity, setMetadataActivity] = useState("");
  const [applicationDetail, setApplicationDetail] = useState(initialValue);
  const {
    application_name,
    applicationID,
    publicKey,
    privateKey,
    secretID,
    emailEnable,
    phoneWhatsEnable,
    blockChain,
    faceRecognitionBiometric,
    redirectUrl,
    sessionExpirationTime,
    domainName,
    ipAddressMatch,
    privacyPolicy,
    tersmsOfUse,
    description,
    appLogo,
  } = applicationDetail;
  console.log(applicationDetail);

  const [newLogo, setAppLogo] = useState([]);
  //app users
  const [appUsersList, setAppusersList] = useState([]);
  const [numberOfUsers, setNumberOfUsers] = useState(0);
  // for metadata
  const [metakey, setMetakey] = useState("");
  const [metaLabel, setMetaLabel] = useState("");
  const [es_metaLabel, es_setMetaLabel] = useState("");
  const [order, setOrder] = useState(0);
  const [metakeyvisibility, setMetakeyvisibility] = useState(1);
  const [metakeyType, setMetakeyType] = useState(1);
  const [metakeyValue, setMetakeyValue] = useState("");
  const [metaDataID, setMetaDataID] = useState(0);
  const [metaDataList, setMetaDataList] = useState([]);

  const [metaTitle, setMetaTitle] = useState("Create");
  const [metaDataButtonTitle, setMetaDataButtonTitle] = useState("Create");

  const [transactionData, setTransactionData] = useState([]);
  const [type, setType] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(appUsersList.length / usersPerPage);
  const transactionPageCount = Math.ceil(transactionData.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  //modal
  const closeModal = () => {
    setIsOpen(false);
    setMetaDataID(0);
    setMetakey("");
    setMetaLabel("");
    setMetakeyvisibility(1);
    setMetakeyType(1);
    setMetakeyValue("");
  };

  const openAddApplicationModal = () => {
    setIsOpen(true);
  };
  const addMetaDataHandle = async () => {
    setisLoader("inline-block");
    const request = {
      id: metaDataID,
      applicationID: id,
      metakey: metakey,
      metaLabel: metaLabel,
      es_metaLabel: es_metaLabel,
      metakeyvisibility: metakeyvisibility,
      order: order,
      metakeyType: metakeyType,
      //'metakeyValue':metakeyValue,
    };
    let response = await addMetaData(request);
    if (response.data.status === 200) {
      console.log(response.data);
      setIsOpen(false);
      setisLoader("none");
      toast.success(response.data.data.message);
      setIsOpen(false);
      getMetaDataLists();

      setMetakey("");
      setMetaLabel("");
      es_setMetaLabel("");
      setMetakeyvisibility(1);
      setOrder(0);
      setMetakeyType(1);
      //setMetakeyValue('');
    } else {
      setIsOpen(false);
      setisLoader("none");
      toast.success(response.data.data.message);
      setIsOpen(false);
      setMetakey("");
      setMetaLabel("");
      es_setMetaLabel("");
      setMetakeyvisibility(1);
      setOrder(0);
      setMetakeyType(1);
      //setMetakeyValue('');
    }
  };
  const getMetaDataLists = async () => {
    const request = { id: id };
    const response = await getMetaDataList(request);
    setMetaDataList(response.data.data);
  };
  const editMetaData = async (metadataID) => {
    setMetaDataID(metadataID);
    setMetaTitle("Edit");
    setMetaDataButtonTitle("Update");
    const request = { id: metadataID };
    const response = await getEditMetaData(request);
    //console.log(response);

    setMetakey(response.data.meta_key);
    setMetaLabel(response.data.metaLabel);
    es_setMetaLabel(response.data.es_MetaLabel);
    setMetakeyvisibility(response.data.visibility);
    setOrder(response.data.orders);
    setMetakeyType(response.data.meta_key_type);
    setMetakeyValue(response.data.meta_value);
    setIsOpen(true);
    //alert(id)
  };
  const deleteMetadata = async (metaid) => {
    const request = { id: metaid };
    const response = await deleteMetaData(request);
    toast.success(response.data.data.message);
    getMetaDataLists();
  };

  //console.log(numberOfUsers);
  const changeActivityTab = () => {
    setActivity("active");
    setSetup("");
    setcontentActivity("active show");
    setContentSetup("");
    setMeatadata("");
    setMetadataActivity("");
  };
  const changeSetUpTab = () => {
    setActivity("");
    setSetup("active");
    setcontentActivity("");
    setContentSetup("active show");
    setMeatadata("");
    setMetadataActivity("");
  };
  const changeMetadataTab = () => {
    setActivity("");
    setMeatadata("active");
    setcontentActivity("");
    setContentSetup("");
    setSetup("");
    setMetadataActivity("active show");
  };
  const getApplicationDetails = async () => {
    const response = await getApplicationDetail(id);
    setApplicationDetail(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoader("inline-block");
    const formData = new FormData();
    formData.append("images", newLogo.image);
    formData.append("id", id);
    formData.append("application_name", application_name);
    formData.append("emailEnable", emailEnable);
    formData.append("redirectUrl", redirectUrl);
    formData.append("sessionExpirationTime", sessionExpirationTime);
    formData.append("domainName", domainName);
    formData.append("privacyPolicy", privacyPolicy);
    formData.append("tersmsOfUse", tersmsOfUse);
    formData.append("description", description);
    formData.append("oldLogo", appLogo);
    let response = await updateApplicationSetup(formData);
    if (response.data.status === 200) {
      setIsOpen(false);
      setisLoader("none");
      toast.success(response.data.data.message);
      history.push("/app/merchant/application-lists");
    } else {
      setIsOpen(false);
      setisLoader("none");
      toast.success(response.data.data.message);
      history.push("/app/merchant/application-lists");
    }
  };
  const handleChangeImage = (e) => {
    setAppLogo({ image: e.target.files[0] });
  };
  const onValueChange = (e) => {
    setApplicationDetail({
      ...applicationDetail,
      [e.target.name]: e.target.value,
    });
  };
  const getApplicationAppUsers = async () => {
    const request = { id: id };
    const response = await getApplicationAppUserList(request);

    setAppusersList(response.data.data);
    setNumberOfUsers(response.data.data?.length);

    //setMetadataarrList(JSON.stringify(response.data.metadata));
  };

  useEffect(() => {
    appUserTransaction();
  }, []);

  const appUserTransaction = async () => {
    const request = { appID: id};
    console.log("requestt appID");
    console.log(request);
    await axios
      .post(URL + "/getTransactionList", request, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        console.log("respopns");
        console.log(res.data);
        setTransactionData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("error");
      });
  };
  console.log("transaction Data!");
  console.log(transactionData);

  useEffect(() => {
    getApplicationAppUsers();
  }, []);
  useEffect(() => {
    getMetaDataLists();
  }, []);
  useEffect(() => {
    getApplicationDetails();
  }, []);

  // GET APPLICATION DETAILS API
  useEffect(() => {
    ApplicationDetails();
  }, []);
  const ApplicationDetails = async () => {
    let reqq = {
      id: id,
    };
    console.log(reqq);
    await axios
      .post(URL + "/merchant/getapplicationdetail", reqq, {
        Accept: "Application/json",
        "Content-Type": "Appplication/json",
      })
      .then((res) => {
        console.log(res);
        setApplicationDetail(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(applicationDetail);

  //EditApplication Detail Api

  const editApplication = async () => {
    await axios
      .post(
        URL + "/merchant/edit-application",
        {
          id: id,
          application_name: application_name,
          privacyPolicy: privacyPolicy,
          tersmsOfUse: tersmsOfUse,
          description: description,
        },
        {
          Accept: "Application/json",
          "Content-Type": "Application/json",
        },
      )
      .then((res) => {
        toast.warn("Data Updated Successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="page-wrapper" style={{ minHeight: "250px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="active-setup-heading-area">
              <h2>{applicationDetail.application_name}</h2>
            </div>

            <div className="user-tab-main-area">
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    onClick={changeActivityTab}
                    className={"nav-link tab-btn " + activity}
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                  >
                    <i className="fa fa-user" aria-hidden="true"></i>Activity
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={changeSetUpTab}
                    className={"nav-link tab-btn " + setup}
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                  >
                    <i className="fa fa-cogs" aria-hidden="true"></i>Setup
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    onClick={changeMetadataTab}
                    className={"nav-link tab-btn " + metadata}
                    id="metatada-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#metatada"
                    type="button"
                    role="tab"
                    aria-controls="metatada"
                    aria-selected="false"
                  >
                    <i class="fa fa-key" aria-hidden="true"></i>Metadata
                  </button>
                </li>
              </ul>
            </div>
            <div className="tab-content" id="myTabContent">
              <div
                className={"tab-pane fade " + contentActivity}
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="users-sessions-main-area">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="app-user-main-heading-area">
                        <h2>Users</h2>
                      </div>
                      <div className="app-user-main-detail-area">
                        <div className="app-user-detail-area">
                          <h4>Users</h4>
                          <p>in your App {numberOfUsers}</p>
                        </div>
                        <div className="app-user-icon-area">
                          <i className="fa fa-user" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="app-user-main-heading-area">
                        <h2>Sessions</h2>
                      </div>
                      <div className="app-user-main-detail-area">
                        <div className="app-user-detail-area">
                          <h4>Sessions</h4>
                          <p>in your App 0</p>
                        </div>
                        <div className="app-user-icon-area">
                          <i className="fa fa-server" aria-hidden="true"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
                          <i class="fa fa-bell" aria-hidden="true"></i>App users
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
                          <i class="fa fa-bell" aria-hidden="true"></i>
                          Transaction
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className="table-data-search-box"
                  style={{ position: "absolute", right: "35px", top: "520px" }}
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
                    <div className="app-user-main-heading-area">
                      <h2>App Users</h2>
                    </div>
                    <div className="app-user-table-area">
                      <table className="table" style={{ whiteSpace: "nowrap" }}>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Users Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th style={{ width: "12%" }}>Country</th>
                            <th>Auth Method</th>
                            <th>No. Of Transaction</th>
                            <th>Document Type</th>
                            <th>Document Number</th>
                            <th>Active/Inactive</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appUsersList
                            .slice(pagesVisited, pagesVisited + usersPerPage)
                            .filter(
                              (row) =>
                                !searchValue.length ||
                                row.name
                                  .toString()
                                  .toLowerCase()
                                  .includes(
                                    searchValue.toString().toLowerCase(),
                                  ),
                            )
                            .map((user, index) => {
                              return (
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    <div className="user-icon-detail-area">
                                      {/* <div className="user-icon-area">
             <i className="fa fa-user" aria-hidden="true"></i>
            </div> */}
                                      <div className="user-name-area">
                                        <h5>
                                          <a href="#">{user.name}</a>
                                        </h5>
                                      </div>
                                    </div>
                                  </td>
                                  <td>{user.email}</td>
                                  <td>{user.phone}</td>
                                  <td>{user.country}</td>
                                  <td>
                                    <div className="face-img-area">
                                      {/*<img src="images/demo-face.jpg" alt="demo face" /> */}
                                      Web
                                    </div>
                                  </td>
                                  {/*
          <td>
              <a href="javascript:void(0);" className="mange-admins-edit-btn"><img src={process.env.PUBLIC_URL +"/assets/images/coolicon.png"} alt="coolicon" /></a>
              <a href="javascript:void(0);" className="mange-admins-dlt-btn"><img src={process.env.PUBLIC_URL +"/assets/images/cancel.png"} alt="cancel" /></a>
          </td>
        */}
                                  <td>{user.transactionCount}</td>
                                  <td>{user.documentType}</td>
                                  <td>{user.documentNumber}</td>
                                  <td>
                                    <div className="onoffswitch">
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
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                      <div style={{display: appUsersList.length > 5 ? 'block' : 'none'}}>
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

                <div
                  className={
                    type == 2 ? "tab-pane fade show active" : "tab-pane fade"
                  }
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  style={type == 2 ? { display: "block" } : { display: "none" }}
                >
                  <div className="app-user-main-heading-area">
                    <h2>Transactions</h2>
                  </div>
                  <div
                    className="app-user-table-area app-user-table-2"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <table className="table">
                      <thead>
                        <tr className="app-user-bg-parents">
                          <th>#</th>
                          <th>Transaction ID</th>
                          <th>User Name</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Country</th>
                          <th>Auth Method</th>
                          <th>Status</th>
                          <th>IP Address</th>
                          <th>Device and Browser</th>
                          <th>Transaction Type</th>
                          <th>Metadata</th>
                          <th>Metadata Hash SH256</th>
                        </tr>
                      </thead>
                      <tbody>
                        {transactionData.slice(pagesVisited, pagesVisited + usersPerPage)
                          .filter(
                            (value) =>
                              !searchValue.length ||
                              value.name
                                .toString()
                                .toLowerCase()
                                .includes(searchValue.toString().toLowerCase()),
                          )
                          .map((transaction, index) => (
                            // return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{transaction.transactionId}</td>
                              <td>
                                <div className="user-icon-detail-area">
                                  {/* <div className="user-icon-area">
                     <i className="fa fa-user" aria-hidden="true"></i>
                    </div> */}
                                  <div className="user-name-area">
                                    <h5>
                                      <a href="javascript:void(0);">
                                        {transaction.userName}
                                      </a>
                                    </h5>
                                  </div>
                                </div>
                              </td>
                              <td>
                                {moment(transaction.created_at).format(
                                  "DD-MM-YYYY",
                                )}
                              </td>
                              <td>
                                {moment(transaction.created_at).format("HH:mm")}
                              </td>
                              <td>{transaction.countryName}</td>
                              <td>Web</td>
                              <td>{transaction.auth_status}</td>
                              <td>{transaction.ipAddress}</td>
                              <td>{transaction.device}</td>
                              <td>{transaction.transactionType}</td>
                              <td>
                                {transaction.metadata !== ""
                                  ? JSON.stringify(transaction.metadata)
                                  : ""}
                              </td>
                              <td>{transaction.metaSha256Hash}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div style={{display: transactionData.length > 5 ? 'block': 'none'}}>
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        pageCount={transactionPageCount}
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
                className={"tab-pane fade " + contentSetup}
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <form
                  onSubmit={handleSubmit}
                  enctype="multipart/form-data"
                  method="post"
                >
                  <div className="app-user-main-heading-area">
                    <h2>API Keys</h2>
                  </div>
                  <div className="setup-api-keys-main-area">
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Application ID</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea">
                              <input
                                type="text"
                                placeholder="Enter Application ID"
                                defaultValue={applicationID}
                                className="form-control"
                                disabled
                              />
                            </div>
                            <div className="api-copy-btn-area">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigator.clipboard.writeText(applicationID);
                                }}
                                className="api-btn"
                              >
                                <i className="fas fa-copy"></i>
                              </a>
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>
                              This is your unique application identifier. It's
                              used to identify you when using Autheasy's API
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Public Key</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea">
                              <input
                                type="text"
                                placeholder="Enter Public Key"
                                defaultValue={publicKey}
                                className="form-control"
                                disabled
                              />
                            </div>
                            <div className="api-copy-btn-area">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigator.clipboard.writeText(publicKey);
                                }}
                                className="api-btn"
                              >
                                <i className="fas fa-copy"></i>
                              </a>
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>
                              This is the public API key to use in your frontend
                              code.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Private Key</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea">
                              <input
                                type="text"
                                placeholder="Enter Admin Private Key"
                                defaultValue={privateKey}
                                className="form-control"
                                disabled
                              />
                            </div>
                            <div className="api-copy-btn-area">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigator.clipboard.writeText(privateKey);
                                }}
                                className="api-btn"
                              >
                                <i className="fas fa-copy"></i>
                              </a>
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>
                              This is the PRIVATE API key. Please keep it secret
                              and use it ONLY from your backend: this key is
                              used to create, update and DELETE your users.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Secret ID</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea">
                              <input
                                type="text"
                                placeholder="Enter SECRET ID"
                                defaultValue={secretID}
                                className="form-control"
                                disabled
                              />
                            </div>
                            <div className="api-copy-btn-area">
                              <a
                                href="javascript:void(0);"
                                onClick={() => {
                                  navigator.clipboard.writeText(secretID);
                                }}
                                className="api-btn"
                              >
                                <i className="fas fa-copy"></i>
                              </a>
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>
                              This is the SECRET ID. Please keep it secret and
                              use it ONLY from your backend: this key is used to
                              create, update and DELETE your users.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app-user-main-heading-area">
                    <h2>Auth Configuration</h2>
                  </div>
                  <div className="setup-api-keys-main-area">
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Auth Methods</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="auth-configuration-email-area">
                            <Switch
                              isOn={emailEnable}
                              onColor="#008000"
                              switchID="jaisriram5"
                              handleToggle={() =>
                                setApplicationDetail((prevState) => ({
                                  ...prevState,
                                  emailEnable: !emailEnable,
                                }))
                              }
                            />
                            <div className="auth-methods-text-area">
                              <p>
                                Email/FaceId/FingerPrint/Passcode/SMS/Whatspp
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Redirect URL</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea redirect-url">
                              <input
                                name="redirectUrl"
                                defaultValue={redirectUrl}
                                onChange={(e) => onValueChange(e)}
                                type="text"
                                placeholder="Enter Redirect URL"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>
                              The url you would like us to redirect to once the
                              user successfully authenticates
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Session Expiration Time</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea redirect-url">
                              <input
                                name="sessionExpirationTime"
                                defaultValue={sessionExpirationTime}
                                onChange={(e) => onValueChange(e)}
                                type="number"
                                placeholder="Enter Session Expiration Time"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>
                              In Minutues. Defaults to 60 minutes.
                              Links/SMS/Whatsapp Codes will expire after 60
                              minutes.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="api-keys-all-input-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="api-keys-heading-area">
                            <h2>Domain Name</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="api-kyes-input-btn-area">
                            <div className="api-kyes-input-box-rea redirect-url">
                              <input
                                name="domainName"
                                defaultValue={domainName}
                                onChange={(e) => onValueChange(e)}
                                type="text"
                                placeholder="Enter Domain Name"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="api-contnet-main-area">
                            <p>Domain Name.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="app-user-main-heading-area">
                    <h2>Application Details</h2>
                  </div>
                  <div className="application-details-main-area">
                    <div className="application-input-pernts">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="input-lebel-heading-area">
                            <h2>Name</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="application-detail-iput-box">
                            <input
                              defaultValue={application_name}
                              name="application_name"
                              onChange={(e) => onValueChange(e)}
                              type="text"
                              placeholder="Enter Name"
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="application-input-pernts">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="input-lebel-heading-area">
                            <h2>Privacy Policy</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="application-detail-iput-box">
                            <input
                              type="text"
                              name="privacyPolicy"
                              placeholder="Enter Privacy Policy"
                              defaultValue={privacyPolicy}
                              onChange={(e) => onValueChange(e)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="application-input-pernts">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="input-lebel-heading-area">
                            <h2>Terms of Use</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="application-detail-iput-box">
                            <input
                              type="text"
                              name="tersmsOfUse"
                              placeholder="Enter Terms of Use"
                              defaultValue={tersmsOfUse}
                              onChange={(e) => onValueChange(e)}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="application-input-pernts">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="input-lebel-heading-area">
                            <h2>Description</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="application-detail-iput-box">
                            <textarea
                              className="form-control"
                              name="description"
                              defaultValue={description}
                              onChange={(e) => onValueChange(e)}
                              placeholder="Enter Message"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="application-input-pernts">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="input-lebel-heading-area">
                            <h2>App Logo</h2>
                          </div>
                        </div>
                        {/* <div className="col-lg-5">
          <div className="application-detail-iput-box">
           <input type='file' onChange={handleChangeImage} name="appLogo" className="form-control" />
          </div>
          </div>  */}
                        <div className="col-lg-3">
                          <div className="upload-file-picks">
                            {/* <img src={`${URL}/uploads/apps/${appLogo}`} /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="setup-save-change-btn"
                      style={{ display: "none" }}
                    >
                      <button
                        type="submit"
                        onClick={editApplication}
                        className="save-change-btn"
                      >
                        Save Changes{" "}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div
                className={"tab-pane fade " + metadataActivity}
                id="metatada"
                role="tabpanel"
                aria-labelledby="metatada-tab"
              >
                <div className="app-user-main-heading-area">
                  <h2 className="metadata-heading">Metadata</h2>
                </div>
                <div
                  className="table-data-search-box"
                  style={{ position: "absolute", right: "35px", top: "260px" }}
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
                <div className="app-user-table-area app-user-table-2">
                  <table className="table">
                    <thead>
                      <tr className="app-user-bg-parents">
                        <th>#</th>
                        <th>Meta Key</th>
                        <th>Meta Label(en)</th>
                        <th>Meta Label(es)</th>
                        <th>Meta type</th>
                        <th>Visibility</th>
                        <th>Order</th>
                      </tr>
                    </thead>
                    <tbody>
                      {metaDataList
                        .filter(
                          (row) =>
                            !searchValue.length ||
                            row.meta_key
                              .toString()
                              .toLowerCase()
                              .includes(searchValue.toString().toLowerCase()),
                        )
                        .map((meta, index) => {
                          return (
                            <tr>
                              <td>{index + 1}</td>
                              <td>{meta.meta_key}</td>
                              <td>{meta.metaLabel}</td>
                              <td>{meta.es_MetaLabel}</td>
                              <td>{meta.meta_key_type}</td>
                              <td>
                                {meta.visibility == 1 ? "Visible" : "Invisible"}
                              </td>
                              <td>{meta.orders}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>

              <Modal show={isOpen}>
                <Modal.Header>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </Modal.Header>
                <Modal.Body>
                  <div className="application-heading-text-area modal-metadata-popup">
                    <h1>{metaTitle} a Metadata</h1>
                  </div>
                  <div className="application-input-text-box">
                    <label>Meta Key</label>
                    <input
                      type="text"
                      value={metakey}
                      onChange={(e) => setMetakey(e.target.value)}
                      placeholder="Enter meta key"
                      className="form-control"
                    />
                  </div>
                  <div className="application-input-text-box">
                    <label>Meta Label(en)</label>
                    <input
                      type="text"
                      value={metaLabel}
                      onChange={(e) => setMetaLabel(e.target.value)}
                      placeholder="Enter meta Label"
                      className="form-control"
                    />
                  </div>
                  <div className="application-input-text-box">
                    <label>Meta Label(es)</label>
                    <input
                      type="text"
                      value={es_metaLabel}
                      onChange={(e) => es_setMetaLabel(e.target.value)}
                      placeholder="Enter meta Label (es)"
                      className="form-control"
                    />
                  </div>
                  <div className="application-input-text-box">
                    <label>Visibility</label>
                    <select
                      className="form-control"
                      value={metakeyvisibility}
                      onChange={(e) => setMetakeyvisibility(e.target.value)}
                    >
                      <option value={1}>Visible</option>
                      <option value={0}>Invisible</option>
                    </select>
                  </div>
                  <div className="application-input-text-box">
                    <label>Order</label>
                    <input
                      type="text"
                      value={order}
                      onChange={(e) => setOrder(e.target.value)}
                      placeholder="Enter Order"
                      className="form-control"
                    />
                  </div>
                  <div className="application-input-text-box">
                    <label>Meta Key Type</label>
                    <select
                      className="form-control"
                      value={metakeyType}
                      onChange={(e) => setMetakeyType(e.target.value)}
                    >
                      <option value={1}>String</option>
                      <option value={2}>Integer</option>
                      <option value={3}>Float</option>
                      <option value={4}>Boolean</option>
                      <option value={5}>Array</option>
                      <option value={6}>Object</option>
                      <option value={7}>Resource</option>
                      <option value={8}>Date</option>
                    </select>
                  </div>
                  {/*
                    <div className="application-input-text-box">
                      <label>Meta Value</label>
                      <input type="text" value={metakeyValue} onChange={(e) => setMetakeyValue(e.target.value)} placeholder="Enter meta key" className="form-control" />  
                    </div>
                    */}
                  <div className="create-application-btn-area">
                    <a
                      href="javascript:void(0)"
                      onClick={addMetaDataHandle}
                      className="create-application-btn"
                    >
                      {metaDataButtonTitle} Metadata{" "}
                      <i
                        style={{ display: isLoader }}
                        className="fa fa-circle-o-notch fa-spin"
                      ></i>
                    </a>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
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

export default ApplicationDetails;
