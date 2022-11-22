import React, { useState, useEffect } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { URL } from "../../../url/url";
import { toast } from "react-toastify";

const ContactDetails = () => {
  const history = useHistory();

  const [Phone_number, setPhone_number] = useState([]);
  const [email, setEmail] = useState([]);
  const [address, setAddress] = useState([]);
  const [data, getData] = useState([]);

  //form Validation
  const [phoneError, setPhoneError] = useState("")
  const phoneRegex = /^([0-9]{0,15})$/;
  const [emailError, setEmailError] = useState("")
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  const [addressError, setAddressError] = useState("")
  const addressRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/;

  const isEnabled = !phoneError && !emailError && !addressError && Phone_number != "" && email != "" && address != ""



  const createContactDetails = (e)=>{
    
    e.preventDefault()
    axios.post(URL + "/createcontactdetails",{
        Phone_number: Phone_number,
        email: email,
        address: address,

    },{
        Accept: "application/json",
        "Content-Type": "application/json",
    }).then(()=>{
        toast.warn("Contact Details Updated Successfully")

    }).catch((err)=>{
        console.log(err);
    })
}






useEffect(() => {
  fetchData();
}, []);



const fetchData = () => {
  fetch( URL + "/getcontactdetails")
    .then((res) => res.json())

    .then((response) => {
    //   console.log(response.data[0]);
      getData(response.data[0])
      setEmail(response.data[0]['email'])
      setPhone_number(response.data[0]['Phone_number'])
      setAddress(response.data[0]['address'])
    });
};


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <div
            className="application-detail-heading-area"
            style={{ padding: "10px" }}
          >
            <h2>Create Contact Details</h2>
          </div>
          {/* <!-- <div class="send-notifications-btn-area">
                 <a href="#" class="send-notifications-btn">Send Notification</a>   
                </div>  --> */}
        </div>
        <div className="col-lg-12">
          <div className="contact-notification-detail-main-area">
            <form className="send-notifications-form-area">
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  onError={phoneError}
                  className={`form-control field ${!phoneError ? 'is-valid' : 'is-invalid'}`}
                  onChange={e => {setPhone_number(e.target.value)
                    const isPhoneCorrect = phoneRegex.test(e.target.value)
                    setPhoneError(e.target.value != "" && !isPhoneCorrect)
                  }}
                  defaultValue={data.Phone_number}
                  name="holdername"
                  placeholder="Enter Phone Number"
                  autofocus=""
                  required="true"
                  id="name"
                />
                <div className="invalid-feedback">
                  {phoneError ? 'Please Enter Valid Phone Number!' : ''}
                </div>
              </div>
              <div className="form-group">
                <label>Email ID</label>
                <input
                  type="text"
                  onError={emailError}
                  className={`form-control field ${!emailError ? 'is-valid' : 'is-invalid'}`}
                  name="holdername"
                  onChange={e => {setEmail(e.target.value)
                    const isEmailCorrect = emailRegex.test(e.target.value)
                    setEmailError(e.target.value != "" && !isEmailCorrect)
                  }}
                  defaultValue={data.email}
                  placeholder="Enter Email ID"
                  autofocus=""
                  required="true"
                  id="name"
                />
                <div className="invalid-feedback">
                  {emailError ? 'Please Enter valid Email!' : ''}
                </div>
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  onError={addressError}
                  className={`form-control field ${!addressError ? 'is-valid' : 'is-invalid'}`}
                  name="holdername"
                  onChange={e => {setAddress(e.target.value)
                    const isAddressCorrect = addressRegex.test(e.target.value)
                    setAddressError(e.target.value != "" && !isAddressCorrect)
                  }}
                  defaultValue={data.address}
                  placeholder="Enter Address"
                  autofocus=""
                  required="true"
                  id="name"
                />
                <div className="invalid-feedback">
                  {addressError ? 'Please Enter Valid Address!': ''}
                </div>
              </div>
              <div className="contact-form-submint-btn-area">
                <button type="button" className="btn btn-danger" disabled={!isEnabled}
                  // href="#/app/contact-us"
                  onClick={createContactDetails}
                  // className="contact-form-submint-btn"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
