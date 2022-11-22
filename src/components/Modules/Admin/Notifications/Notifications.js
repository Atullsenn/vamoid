import React, { useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import DeleteForever from "@material-ui/icons/DeleteForever";
import axios from "axios";
import { Link } from "react-router-dom";
import Moment from "moment";
import { URL } from "../../../../url/url";
import { toast} from "react-toastify";
import ReactPaginate from "react-paginate";
import CircularProgress from '@mui/material/CircularProgress';

const Notifications = () => {

  const [type, setType] = useState(1);
  const [data, setData] = useState([])
  const [getadmindata, setAdmindata] = useState([])
  const [user_id, setUser_id] = useState(4);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

    const usersPerPage = 5;
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(data.length / usersPerPage);

    const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Send Notification form validation
  const [subjectError, setSubjectError] = useState("")
  const subjectRegex = /^[a-zA-Z !.?,\s]{20,200}$/
  const [messageError, setMessageError] = useState("")
  const messageRegex = /^[a-zA-Z ,.! 0-9\s]{50,1000}$/ 

  const isEnabled = !subjectError && !messageError && subject != "" && message != ""

  useEffect(() => {
    getadminnotification()
  }, [])

  const getadminnotification = () => {
    const request = {
      'user_id': localStorage.getItem('superAdminId')
    }
    //console.log(request)
    axios.post(URL + '/getadminnotification', request, {
      Accept: 'application/json',
      'content-type': 'application/json',
    }).then((res) => {
      // console.log(res.data.data)
      setAdmindata(res.data.data)
    }).catch(err => console.log(err))
  }
  //console.log(getadmindata)


  //delete admin receive notification api
  const deletereceivenotifications = async (th) => {

    await axios
      .post(URL + "/removeadminnotification",{id: th })
      .then((res) => {
        toast.success("Notification deleted successfully");
        //console.log(res);
        getadminnotification()
      })
      .catch((err) => {
        console.log(err)

      });

  };

  const handleremove = (e, th) => {
    //console.log('receive notification')
    //console.log(th)
    deletereceivenotifications(th);
    
  };


  //SendAdminNotificaton api

  

  const sendAdminNotification = async () => {

    await axios.post(URL + '/sendadminnotification', {
      user_type: user_id,
      userid: localStorage.getItem('superAdminId'),
      subject: subject,
      message: message,
    },
      {
        Accept: 'Application/json',
        'Content-Type': 'Application/json'
      }).then(res => {
        toast.success('Notification Send Successfully!')
        getAdminSendNotification()
        //console.log(res)
      }).catch(err => console.log(err))
      setSubject("")
      setMessage("")
     

  }

  // Get AdminSendNotification API
 

  useEffect(() => {
    getAdminSendNotification()
  }, [])

  const getAdminSendNotification = async() => {
    let req = {
      'user_id': localStorage.getItem('superAdminId')
    }
    // console.log(req)
    await axios.post(URL + '/getadminsendnotification', req, {
      Accept: 'application/json',
      'content-type': 'application/json',
    }).then((res) => {
      // console.log(res.data.data)
      setData(res.data.data)
    }).catch(err => console.log(err))
  }
  //console.log(data);

  // delete send notification api

  const deleteSendNotification = async (th) => {
    
    await axios
      .post(URL + "/deletesendnotification",{'id':th})
      .then((res) => {
        //console.log(res);
        getAdminSendNotification()
        
      })
      .catch((err) => {
        console.log(err)

      });

  };

  const handledelete = async (e, th) => {
    toast.warn("data deleted successfully");
    await deleteSendNotification(th);
    

  };
  



  const getUserTypeName = (userType) => {
    if (userType == 2) {
      return 'Merchant ';
    }
    else if (userType == 3) {
      return 'End User';
    }
    else if (userType == 4) {
      return 'All';
    }
    return '';
  }


  return (
    <div className="page-wrapper" style={{ 'minHeight': "250px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
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
                      <i class="fa fa-bell" aria-hidden="true"></i>Notification
                      List
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
                      <i class="fa fa-bell" aria-hidden="true"></i>Notification
                      Received
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
                      <i class="fa fa-bell" aria-hidden="true"></i>Send
                      Notification
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tab-content" id="myTabContent" style={type == 1 ? { "display": "block" } : { "display": "none" }} >
              <div
                className={
                  type == 1 ? "tab-pane fade active show" : "tab-pane fade"
                }
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div class="app-user-main-heading-area">
                  <h2>Notification List</h2>
                </div>
                {data.length === 0 ? (<div style={{position:'absolute',left:'50%',top:'60%', color: 'pink'}}><CircularProgress disableShrink /></div>) : ''}
                <div className="manage-admins-main-area">
                  <div className="manage-admins-table-area">
                    <table className="table">
                    {/* {data.length === 0 ? (<div style={{position:'absolute',left:'50%', color: 'pink'}}><CircularProgress disableShrink /></div>) : ''} */}
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>User</th>
                          <th>Subject</th>
                          <th>Message</th>
                          <th>Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>

                        {data.slice(pagesVisited, pagesVisited + usersPerPage).map((e1,i) => (
                          <tr>

                            <td>{i + pagesVisited + 1}</td>
                            <td>
                              <div className="user-icon-detail-area">
                                {/* <div className="company-user-icon-area">
                   <img src="images/demo-logo.png" alt="company logo"/>
                 </div> */}
                                <div className="user-name-area">
                                  <h5>
                                    <a href="javascript: void(0);">{
                                      getUserTypeName(e1.user_type)
                                    }</a>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{e1.subject.substr(0, 25) + ".."}</td>
                            <td>{e1.message.substr(0, 25) + ".."}</td>
                            <td>
                              {Moment(e1.date).format("DD-MM-YYYY HH:mm")}
                            </td>
                            <td>
                              <Link
                                to={`/app/notification-details/${e1.id}`}

                                className="mange-admins-edit-btn"
                              >
                                <i class="fas fa-eye"></i>
                              </Link>
                              <Link
                                to={`/app/notifications`}
                                datalist={e1.id}
                                onClick={e => handledelete(e, e1.id)}


                                className="mange-admins-dlt-btn"
                              >
                                <i class="far fa-trash-alt"></i>
                              </Link>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div style={{display : data.length > 5 ? 'block' : 'none'}}>
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
            <div
              className={
                type == 2 ? "tab-pane fade show active" : "tab-pane fade"
              }
              id="profile"
              role="tabpanel"
              aria-labelledby="profile-tab"
              style={type == 2 ? { "display": "block" } : { "display": "none" }}


            >
              <div class="app-user-main-heading-area">
                <h2>Notification Received</h2>
              </div>
              <div className="faq-accordian-main-area notification-arrow-hide-parents">
                {getadmindata.map((data) => (
                  <div
                    className="accordion accordion-flush"
                    id="accordionFlushExample"
                  >
                    <Accordion defaultActiveKey="0">

                      <Accordion.Item eventKey="1">
                        <h2 className="accordion-header" id="flush-headingOne">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#flush-collapseOne"
                            aria-expanded="false"
                            aria-controls="flush-collapseOne"
                          >
                            <div className="notification-detail-main-area">
                              <div className="notification-user-img">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/user-img.jpg"
                                  }
                                  alt="user img"
                                />
                              </div>
                              <div className="notification-heading-main-area">
                                <Accordion.Header>
                                  <h2>{data.subject}</h2>
                                </Accordion.Header>
                                <p>{Moment(data.date).format("DD-MM-YYYY HH:mm")}</p>
                              </div>
                              <div className="notification-dlt-main-area">
                                <a
                                  href="javascript: void(0);"
                                  datalist={data.notificationID}
                                  onClick={(e)=> handleremove(e,data.notificationID)}

                                >
                                  <DeleteForever style={{ color: "#FF5C93" }} />
                                </a>
                              </div>
                            </div>
                          </button>
                        </h2>
                        <div
                          id="flush-collapseOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="flush-headingOne"
                          data-bs-parent="#accordionFlushExample"
                        >
                          <Accordion.Body>{data.message}</Accordion.Body>
                        </div>
                      </Accordion.Item>

                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
            <div
              className={
                type == 3 ? "tab-pane fade show active" : "tab-pane fade"
              }
              id="contact"
              role="tabpanel"
              aria-labelledby="contact-tab"

              style={type == 3 ? { "display": "block" } : { "display": "none" }}
            >
              <div class="app-user-main-heading-area">
                <h2>Send Notifications</h2>
              </div>
              <div className="col-lg-12">
                <div className="contact-notification-detail-main-area">
                  <form className="send-notifications-form-area">
                    <div className="form-group">
                      <label>User Type</label>
                      <div className="profile-input-box-area">
                        <select
                          className="form-control"
                          onChange={e => setUser_id(e.target.value)}

                          name="cars"
                          id="cars"
                        >
                          <option value="4">All</option>
                          <option value="2">Merchant</option>
                          <option value="3">End User</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        onError={subjectError}
                        class={`form-control field ${!subjectError ? 'is-valid' : 'is-invalid'}`}
                        onChange={e => {setSubject(e.target.value)
                          const isSubjectValid = subjectRegex.test(e.target.value)
                          setSubjectError(e.target.value != "" && !isSubjectValid)
                        }}
                        value={subject}

                        name="holdername"
                        placeholder="Enter Subject"
                        autofocus=""
                        required="true"
                        id="name"
                      />
                      <div className="invalid-feedback">
                        {subjectError ? 'Subject should be minimum length 20 and maximum length is 200 character' : ''}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        class={`form-control field ${!messageError ? 'is-valid' : 'is-invalid'}`}
                        onError={messageError}
                        onChange={e => {setMessage(e.target.value)
                          const isMessageValid = messageRegex.test(e.target.value)
                          setMessageError(e.target.value != "" && !isMessageValid)
                        }}
                        value={message}

                        placeholder="Enter Message"
                      ></textarea>
                      <div className="invalid-feedback">
                        {messageError ? 'Message should be minimum length 50 and maximum length is 1000 character!' : ''}
                      </div>
                    </div>
                    <div className="contact-form-submint-btn-area">
                      <button type="button" className="btn btn-danger" disabled={!isEnabled}
                        onClick={sendAdminNotification}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      <footer className="footer text-center"> 2021 © Ample Admin brought to you by <a
        href="https://www.wrappixel.com/">wrappixel.com</a>
      </footer>
    </div>
  );
};

export default Notifications;
