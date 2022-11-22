import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Modal from "react-bootstrap/Modal";
import { useHistory, Link, useParams } from "react-router-dom";
import Moment from "moment";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
import "./style.css";
import { URL } from "../../../../url/url";
import axios from "axios";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";
//import moment from 'moment'
export default function ApplicationList() {
  let history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [application_name, setApplicationName] = useState("");
  const [applicationList, setApplicationList] = useState([]);
  const [activeInactive, setActiveInactive] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();
  const closeModal = () => {
    setIsOpen(false);
  };

  const openAddApplicationModal = () => {
    setIsOpen(true);
  };

  //pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(applicationList.length / usersPerPage);
 

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // getApplication Data Api
  useEffect(() => {
    GetApplicationData();
  }, []);

  const GetApplicationData = async () => {
    let reqq = {
      user_type: 2,
      user_id: localStorage.getItem("superAdminId"),
    };
    
    await axios
      .post(URL + "/merchant/getappuserdata", reqq, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        setApplicationList(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(applicationList);

  //create Application list API

  function generateRandomString(length) {
    var result = "";
    var characters =
      "ABCDEFGHAGDHQBNMLKOIUIUGQWAOIYIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvkjshdkjfwxyz01234567892487198712332";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const createapplication = async (res) => {
    
    if (application_name == "") {
      toast.error("Please enter Application name");
      return false;
    }
    if(res.length > 0){
      toast.warn('Please Choose Other Name!')
      return;
    }
     else {
      await axios
        .post(
          URL + "/merchant/create-application",
          {
            user_id: localStorage.getItem("superAdminId"),
            application_name: application_name,
            applicationID: generateRandomString(10),
            publicKey: generateRandomString(15),
            privateKey: generateRandomString(20),
            secretID: generateRandomString(20),
          },
          {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
        )
        .then((res) => {
          toast.success("Application Created Successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (res) {
      setIsOpen(false);
      GetApplicationData();
    }
   
  };

  //Delete Application API

  const applicationDelete = async (th) => {
    await axios
      .post(URL + "/merchant/application-delete", { id: th })
      .then((res) => {
        createapplication();
        //console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleremove = (e, th) => {
    alert("Application Deleted Successfully");
    applicationDelete(th);
  };


  const handleAppStatus = async (status, usersID) =>{
    var getStatus;
    if(status == 0)
    {
      getStatus = 1
    }
    else{
      getStatus = 0
    }
    
    //console.log(getStatus+" , "+usersID);
    const request = {
                    'id':usersID,
                    'status':getStatus
                    };
                    console.log("update status status status")
                   
   await axios.post(URL + "/changeAppStatus",request)
    .then((res)=>{
        //console.log(res)
        GetApplicationData()
    }).catch((err)=>{
      console.log(err)
    })
  
    
  }

  return (
    <div style={{ padding: "24px" }}>
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
          <div className="application-heading-text-area">
            <h1>Create An Application</h1>
            <p>Pick a name and get started!</p>
          </div>
          <div className="application-input-text-box">
            <input
              type="text"
              onChange={(e) => setApplicationName(e.target.value)}
              placeholder="Application Name"
              className="form-control"
            />
          </div>
          <div className="create-application-btn-area">
            <a
              href="javascript:void(0)"
              onClick={createapplication}
              className="create-application-btn"
            >
              Create Application{" "}
            </a>
          </div>
        </Modal.Body>
      </Modal>
      {applicationList.length == 0 ? (
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="application-detail-heading-area">
                <h2>Create Application</h2>
              </div>
              <div className="change-password-main-area">
                <div className="create-application-main-area">
                  <h2>No Applications found</h2>
                  <p>Get started by creating a new Application</p>
                </div>
                <div className="change-password-submit-area">
                  <a
                    href="javascript:void(0)"
                    onClick={openAddApplicationModal}
                    className="submit-password-change-btn"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal-search"
                  >
                    Create Application
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="application-detail-heading-area">
                <h2>All Applications</h2>
              </div>
              <div
                className="table-data-search-box"
                style={{
                  position: "relative",
                  width: "15rem",
                  left: "755px",
                  top: "23px",
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
              <div className="application-detail-main-area">
                <div className="application-list-create-app-btn-area">
                  <p>Applications List</p>
                  <div className="create-applications-btn-area">
                    <a
                      onClick={openAddApplicationModal}
                      href="javascript:void(0)"
                      className="create-application-btn"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal-search"
                    >
                      <i className="fa fa-plus-circle" aria-hidden="true"></i>{" "}
                      Create Application
                    </a>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Applications Name</th>
                      <th>Created On</th>
                      <th>Admin</th>
                      <th>View Details</th>
                      <th>Action</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationList.filter(
                        (row) =>
                          !searchValue.length ||
                          row.application_name
                            .toString()
                            .toLowerCase()
                            .includes(searchValue.toString().toLowerCase()),
                      )
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((app, index) => {
                        return (
                          <tr>
                            <td className="srial-number">{index + pagesVisited + 1}</td>
                            <td>
                              <div className="user-icon-detail-area">
                                {/* <div className="user-icon-area">
                                                                <img src={`${URL}/uploads/apps/`} alt="mobile icon" />
                                                            </div>  */}
                                <div className="user-name-area">
                                  <h5>
                                    <Link
                                      to={`/app/merchant/application-setup-activity/${app.id}`}
                                    >
                                      {app.application_name}
                                    </Link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>
                              {Moment(app.created_at).format(
                                "DD-MM-YYYY HH:mm",
                              )}
                            </td>
                            <td>
                              <div className="user-icon-detail-area">
                                {/* <div className="company-user-icon-area">
                                                                <img src="https://laravel.com/img/logotype.min.svg" alt="company logo" />
                                                            </div> */}
                                <div className="user-name-area">
                                  <h5>
                                    <Link
                                      to={`/app/merchant/application-setup-activity/${app.id}`}
                                    >
                                      {app.name}
                                    </Link>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td className="text-center-padding">
                              <Link
                                to={`/app/merchant/application-setup-activity/${app.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-eye"></i>
                              </Link>
                            </td>
                            <td>
                              <Link
                                to={`/app/merchant/application-setup-activity/${app.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript:void(0)"
                                datalist={app.id}
                                onClick={(e) => handleremove(e, app.id)}
                                className="mange-admins-dlt-btn"
                              >
                                <i className="far fa-trash-alt"></i>
                              </a>
                            </td>
                            <td>
                             
                              <button type="button" className="subscription-plan-custmize-btn" onClick={()=>{handleAppStatus(app.status, app.id)}}>{app.status == 1 ? 'Active' : 'Inactive'}</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div style={{display: applicationList.length > 5 ? 'block' : 'none'}}>
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
      )}
    </div>
  );
}
