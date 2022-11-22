import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../../url/url";
import { toast } from "react-toastify";

const Contactus = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // Form Validation
  const nameRegex = /^[a-zA-Z\s]{0,25}$/;
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  const phoneNumberRegex = /^([0-9]{0,15})$/;
  const subjectRegex = /^[a-zA-Z\s]{0,50}$/;
  const messageRegex = /^[a-zA-Z\s]{0,1000}$/;
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [contactError, setContactError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [messageError, setMessageError] = useState("");

  const isEnabled =
    !nameError &&
    !emailError &&
    !contactError &&
    !subjectError &&
    !messageError &&
    name != "" &&
    email != "" &&
    phone_number != "" &&
    subject != "" &&
    message != "";

  const sendInquiry = async () => {
    await axios
      .post(
        URL + "/sendinquiry",
        {
          name: name,
          email: email,
          phone_number: phone_number,
          subject: subject,
          message: message,
        },
        {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      )
      .then((res) => {
        toast.warn("Inquiry Send Successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log("data not submitted");
      });
    setName("");
    setEmail("");
    setMessage("");
    setPhone_number("");
    setSubject("");
  };

  // get contact details api

  const [data, getData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetch(URL + "/getcontactdetails")
      .then((res) => res.json())

      .then((response) => {
        console.log(response.data[0]);
        getData(response.data[0]);
        console.log(data);
      });
  };

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7">
              <div className="application-detail-heading-area">
                <h2>Send Enquiry</h2>
              </div>
              <div className="contact-detail-main-area">
                <div className="row">
                  <div className="col-lg-12">
                    <form
                      className="contact-form-main-area"
                      action=""
                      method=""
                      id="paymentFrm"
                    >
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Name</label>
                            <input
                              onError={nameError}
                              type="text"
                              className={`form-control field ${!nameError?'is-valid':'is-invalid'}`} 
                              value={name}
                              onChange={(e) => {
                                setName(e.target.value);
                                const isNameCorrect = nameRegex.test(
                                  e.target.value,
                                );
                                setNameError(!isNameCorrect);
                              }}
                              name="holdername"
                              placeholder="Name"
                              autofocus=""
                              required="true"
                              id="name"
                            />
                            <div className="invalid-feedback">
                              {nameError ? "Please Enter Name in String!" : ""}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Email ID</label>
                            <input
                              type="text"
                              onError={emailError}
                              className={`form-control field ${!emailError ? 'is-valid':'is-invalid'}`} 
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                const isEmailCorrect = emailRegex.test(
                                  e.target.value,
                                );
                                setEmailError(e.target.value != '' && !isEmailCorrect);
                              }}
                              name="holdername"
                              placeholder="Email ID"
                              autofocus=""
                              required="true"
                              id="name"
                            />
                            <div className="invalid-feedback">
                              {emailError ? "Please Enter Valid Email!" : ""}
                            </div>
                           
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label>Contact Number</label>
                            <input
                              type="text"
                              onError={contactError}
                              className={`form-control field ${!contactError?'is-valid':'is-invalid'}`} 
                              value={phone_number}
                              onChange={(e) => {
                                setPhone_number(e.target.value);
                                const isContactCorrect = phoneNumberRegex.test(
                                  e.target.value,
                                );
                                setContactError(!isContactCorrect);
                              }}
                              name="holdername"
                              placeholder="Contact Number"
                              autofocus=""
                              required="true"
                              id="name"
                            />
                            <div className="invalid-feedback">
                              {contactError
                                ? "Please Enter Contact Number In Integer!"
                                : ""}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Subject</label>
                            <input
                              type="text"
                              onError={subjectError}
                              className={`form-control field ${!subjectError?'is-valid':'is-invalid'}`} 
                              value={subject}
                              onChange={(e) => {
                                setSubject(e.target.value);
                                const isSubjectValid = subjectRegex.test(
                                  e.target.value,
                                );
                                setSubjectError(!isSubjectValid);
                              }}
                              name="holdername"
                              placeholder="Subject"
                              autofocus=""
                              required=""
                              id="name"
                            />
                            <div className="invalid-feedback">
                              {subjectError
                                ? "Please Enter Subject In String And Maximum 100 character!"
                                : ""}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label>Message</label>
                            <textarea
                               className={`form-control field ${!messageError?'is-valid':'is-invalid'}`} 
                              onError={messageError}
                              value={message}
                              onChange={(e) => {
                                setMessage(e.target.value);
                                const isMessageValid = messageRegex.test(
                                  e.target.value,
                                );
                                setMessageError(!isMessageValid);
                              }}
                              placeholder="Message"
                            ></textarea>
                            <div className="invalid-feedback">
                              {messageError
                                ? "Please Enter Message In String And Maximum 1000 Character!"
                                : ""}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="contact-form-submint-btn-area">
                          <button type="button" class="btn btn-danger" disabled={!isEnabled} onClick={sendInquiry}>
                                Submit
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="application-detail-heading-area">
                <h2>Contact Details</h2>
              </div>
              <div className="contact-detail-main-area">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="contact-address-card-area">
                      <div className="contact-address-map-marker">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                      </div>
                      <div className="contact-address-emial-area">
                        <h4>Phone Number</h4>
                        <p>{data.Phone_number}</p>
                      </div>
                    </div>
                    <div className="contact-address-card-area">
                      <div className="contact-address-map-marker">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </div>
                      <div className="contact-address-emial-area">
                        <h4>Email Us</h4>
                        <p>{data.email}</p>
                      </div>
                    </div>
                    <div className="contact-address-card-area">
                      <div className="contact-address-map-marker">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                      </div>
                      <div className="contact-address-emial-area">
                        <h4>Our Address</h4>
                        <p>{data.address}</p>
                      </div>
                    </div>
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

export default Contactus;
