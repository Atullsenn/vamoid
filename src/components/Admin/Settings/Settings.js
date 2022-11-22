import * as Axios from "axios";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../../url/url";
import { toast } from "react-toastify";
const Settings = () => {
  const [type, setType] = useState(1);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [postal, setPostal] = useState("");
  const [gender, setGender] = useState("");
  const [image,setImage] = useState("")
  const [data, getData] = useState("");

  // Form Validation
  const [nameError, setNameError] = useState("");
  const nameRegex = /^[a-zA-Z\s]{0,25}$/;
  const [emailError, setEmailError] = useState("");
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  const [phoneError, setPhoneError] = useState("");
  const phoneRegex = /^([0-9]{0,15})$/;
  const [addressError, setAddressError] = useState("");
  const addressRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/;
  const [zipCodeError, setZipCodeError] = useState("");
  const zipCodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

  const isEnabled =
    !nameError &&
    !emailError &&
    !phoneError &&
    !addressError &&
    !zipCodeError &&
    name != "" &&
    email != "" &&
    phone != "" &&
    address != "" &&
    postal != "";

  useEffect(() => {
    getadmindata();
  }, []);

  const getadmindata = async () => {
    const req = {
      id: localStorage.getItem("superAdminId"),
    };
    await axios.post(URL + "/getsettingsdata", req).then((response) => {
      //console.log(response);
      getData(response.data.data[0]);
      // setData(response.data.data[0])
      setName(response.data.data[0]["name"]);
      setEmail(response.data.data[0]["email"]);
      setAddress(response.data.data[0]["address"]);
      setPhone(response.data.data[0]["phone_number"]);
      setCountry(response.data.data[0]["country"]);
      setState(response.data.data[0]["state"]);
      setCity(response.data.data[0]["city"]);
      setGender(response.data.data[0]["gender"]);
      setPostal(response.data.data[0]["postal"]);
      setImage(response.data.data[0]["comapny_image"])
    });
  };

  const submitform = async () => {

    const formData = new FormData()
          formData.append('id',localStorage.getItem("superAdminId"))
          formData.append('name',name)
          formData.append('email',email)
          formData.append('phone',phone)
          formData.append('address',address)
          formData.append('country',country)
          formData.append('state',state)
          formData.append('city',city)
          formData.append('postal',postal)
          formData.append('gender', gender)
          formData.append('company_image',image)
   
    let res = await axios
      .post(URL + "/updateadmin", formData)
      .then(() => {
        toast.success("Data Updated Successfully")
        
      })
      .catch((err) => {
        console.log(err);
      });
      getadmindata()
  };

  //Country Api fetch
  const [getcountrylist, setCountrylist] = useState([]);
  const [getstatelist, setStatelist] = useState([]);
  const [getcitylist, setCitylist] = useState([]);

  useEffect(() => {
    Axios.get(URL + "/countriesList", {
      Accept: "application/json",
      "Content-Type": "application/json",
    })
      .then((res) => {
        setCountrylist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const stateShow = (countryid1) => {
    Axios.post(
      URL + `/statesList/`,
      { cid: countryid1 },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    )
      .then((res) => {
        console.log(res);
        setStatelist(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cityShow = (stateid1) => {
    Axios.post(
      URL + `/citiesList/`,
      { sid: stateid1 },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    )
      .then((res) => {
        console.log(res);
        setCitylist(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlecountry = (e) => {
    setCountry(e.target.value);
    stateShow(e.target.value);
  };

  const handlestate = (e) => {
    const getstateid = e.target.value;
    setState(getstateid);
    cityShow(getstateid);
  };

  //change password api
  // const [src,setSrc] = useState("")

  const [password, setPassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  //validation
  const [passwordError, setPasswordError] = useState("");
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
  const [newpasswordError, setNewpasswordError] = useState("");

  const ChangePassword = async () => {
    if (password == "") {
      toast.warn("Please Enter old Password");
    } else if (newpassword == "") toast.warn("Please enter New Password");
    // If confirm password not entered
    else if (confirmpassword == "") toast.warn("Please enter confirm password");
    // If Not same return False.
    else if (newpassword != confirmpassword) {
      toast.warn("\nPassword did not match: Please try again...");
      return false;
    }

    // If same return True.
    else {
      let reqq = {
        id: localStorage.getItem("superAdminId"),
        password: password,
        newpassword: newpassword,
      };
      console.log(reqq);
      await Axios.post(URL + "/resetpassword", reqq, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
        .then((res) => {
          toast.success("Password changed Successfully");
          //console.log(res);
        })
        .catch((err) => {
          // console.log(err.message);
          toast.error("password Incorrect!")
        });
    }

    setPassword("");
    setNewpassword("");
    setConfirmpassword("");
  };


  //change photo
  const uploadedImage = React.useRef(null);
  const imageUploader = React.useRef(null);

  const handleImageUpload = e => {
    const [file] = e.target.files;
    setImage(e.target.files[0])
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };




  //change photo

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="application-detail-heading-area">
                <h2>Settings</h2>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="setting-tab-detail-main-area">
                <div className="setting-tab-main-area">
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        onClick={() => setType(1)}
                        className={
                          type == 1
                            ? "nav-link tab-btn  active"
                            : "nav-link tab-btn "
                        }
                        id="manage-profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#manage-profile"
                        type="button"
                        role="tab"
                        aria-controls="manage-profile"
                        aria-selected="false"
                      >
                        <i className="fa fa-user" aria-hidden="true"></i>Manage
                        Profile
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
                        id="change-password-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#change-password"
                        type="button"
                        role="tab"
                        aria-controls="change-password"
                        aria-selected="true"
                      >
                        <i className="fa fa-lock" aria-hidden="true"></i>Change
                        Password
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className={
                      type == 1 ? "tab-pane fade show active" : "tab-pane fade"
                    }
                    id="manage-profile"
                    role="tabpanel"
                    aria-labelledby="manage-profile-tab"
                  >
                    <div className="row">
                      <div className="col-lg-5">
                        <div className="setting-tab-heading-area">
                          <h2>Personal Info</h2>
                        </div>
                        <div className="setting-profile-detail-main-area">
                          <div className="user-photo-main-area">
                            <div className="user-img-area">
                              <img
                              ref={uploadedImage}
                              // src={data.image}
                                src={
                                  data.company_image==='' || data.company_image === null?
                                  process.env.PUBLIC_URL +
                                  "/assets/images/user-img.jpg" : data.company_image
                                  
                                }
                                alt="user img"
                              />
                            </div>
                            <div className="change-photo-btn-area" style={{display: 'inline-block'}}>
                              {/* <a href="#" className="change-poto-btn">
                                <i
                                  className="fa fa-camera"
                                  aria-hidden="true"
                                ></i>
                                Edit
                              </a> */}
                              <label className="change-poto-btn">
                              <i
                                  className="fa fa-camera"
                                  aria-hidden="true"
                                ></i>
                                Edit
                              <input onChange={handleImageUpload}
        ref={imageUploader} type="file" style={{display:"none"}}></input>

                              </label>
                              
                            </div>
                          </div>
                          <div className="user-detail-main-area">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="personal-information-heading">
                                  <h2>Full Name</h2>
                                  <h2>Email ID</h2>
                                  <h2>Phone</h2>
                                  <h2>Gender</h2>
                                  <h2>Country</h2>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="personal-information-details">
                                  <p>{data.name}</p>

                                  <p>{data.email}</p>
                                  <p>{data.phone_number}</p>
                                  <p>{data.gender}</p>
                                  <p>{data.countryName}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-7">
                        <div className="setting-tab-heading-area">
                          <h2>Personal Details</h2>
                        </div>
                        <div className="setting-profile-detail-input-area">
                          <form
                            className="contact-form-main-area"
                            action="payment.php"
                            method="POST"
                            id="paymentFrm"
                          >
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    onError={nameError}
                                    className={`form-control field ${
                                      !nameError ? "is-valid" : "is-invalid"
                                    }`}
                                    onChange={(event) => {
                                      setName(event.target.value);
                                      const isNameCorrect = nameRegex.test(
                                        event.target.value,
                                      );
                                      setNameError(!isNameCorrect);
                                    }}
                                    defaultValue={data.name}
                                    name="holdername"
                                    placeholder="Enter First Name"
                                    autofocus=""
                                    required=""
                                    id="name"
                                  />
                                  <div className="invalid-feedback">
                                    {nameError
                                      ? "Please Enter Name in String!"
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Email ID</label>
                                  <input
                                    type="text"
                                    onError={emailError}
                                    className={`form-control field ${
                                      !emailError ? "is-valid" : "is-invalid"
                                    } `}
                                    onChange={(event) => {
                                      setEmail(event.target.value);
                                      const isEmailCorrect = emailRegex.test(
                                        event.target.value,
                                      );
                                      setEmailError(!isEmailCorrect);
                                    }}
                                    defaultValue={data.email}
                                    name="holdername"
                                    placeholder="Enter Email ID"
                                    autofocus=""
                                    required=""
                                    id="name"
                                  />
                                  <div className="invalid-feedback">
                                    {emailError
                                      ? "Please Enter Valid Email!"
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Contact Number</label>
                                  <input
                                    type="text"
                                    onError={phoneError}
                                    className={`form-control field ${
                                      !phoneError ? "is-valid" : "is-invalid"
                                    }`}
                                    onChange={(event) => {
                                      setPhone(event.target.value);
                                      const isPhoneCorrect = phoneRegex.test(
                                        event.target.value,
                                      );
                                      setPhoneError(
                                        event.target.value !== "" &&
                                          !isPhoneCorrect,
                                      );
                                    }}
                                    defaultValue={data.phone_number}
                                    name="holdername"
                                    placeholder="Enter Contact Number"
                                    autofocus=""
                                    required=""
                                    id="name"
                                  />
                                  <div className="invalid-feedback">
                                    {phoneError
                                      ? "Please Enter Valid Phone Number!"
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Gender</label>
                                  <div className="profile-input-box-area">
                                    <select
                                      className="form-control"
                                      onChange={(event) => {
                                        setGender(event.target.value);
                                      }}
                                      name="cars"
                                      id="cars"
                                    >
                                      <option value="">Select Gender</option>
                                      <option value="Male">Male</option>
                                      <option value="Female">Female</option>
                                      <option value="other">Other</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    onError={addressError}
                                    className={`form-control field ${
                                      !addressError ? "is-valid" : "is-invalid"
                                    }`}
                                    defaultValue={data.address}
                                    onChange={(event) => {
                                      setAddress(event.target.value);
                                      const isAddressValid = addressRegex.test(
                                        event.target.value,
                                      );
                                      setAddressError(!isAddressValid);
                                    }}
                                    name="holdername"
                                    placeholder="Enter Address"
                                    autofocus=""
                                    required=""
                                    id="name"
                                  />
                                  <div className="invalid-feedback">
                                    {addressError
                                      ? "Please Enter Valid Address!"
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Country</label>
                                  <div className="profile-input-box-area">
                                    <select
                                      className="form-control"
                                      name="cars"
                                      id="cars"
                                      onChange={(e) => handlecountry(e)}
                                    >
                                      <option>--Choose Country--</option>

                                      {getcountrylist.map((e) => {
                                        return (
                                          <option value={e.id}>{e.name}</option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>State</label>
                                  <div className="profile-input-box-area">
                                    <select
                                      className="form-control"
                                      name="cars"
                                      id="cars"
                                      onChange={(e) => handlestate(e)}
                                    >
                                      <option>Select State</option>
                                      {getstatelist.map((e) => {
                                        return (
                                          <option value={e.id}>
                                            {e.statename}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>City</label>
                                  <div className="profile-input-box-area">
                                    <select
                                      className="form-control"
                                      name="cars"
                                      id="cars"
                                      onChange={(e) => setCity(e.target.value)}
                                    >
                                      <option value="">Select City</option>

                                      {getcitylist.map((e) => {
                                        return (
                                          <option value={e.id}>
                                            {e.cityname}
                                          </option>
                                        );
                                      })}
                                    </select>
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label>Postal/ZIP Code</label>
                                  <input
                                    type="text"
                                    onError={zipCodeError}
                                    className={`form-control field ${
                                      !zipCodeError ? "is-valid" : "is-invalid"
                                    }`}
                                    defaultValue={data.postal}
                                    onChange={(event) => {
                                      setPostal(event.target.value);
                                      const isZipCorrect = zipCodeRegex.test(
                                        event.target.value,
                                      );
                                      setZipCodeError(
                                        event.target.value != "" &&
                                          !isZipCorrect,
                                      );
                                    }}
                                    name="holdername"
                                    placeholder="Enter Postal/ZIP Code"
                                    autofocus=""
                                    required="true"
                                    id="name"
                                  />
                                  <div className="invalid-feedback">
                                    {zipCodeError
                                      ? "Please Enter Valid Zip Code!"
                                      : ""}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="contact-form-submint-btn-area">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    disabled={!isEnabled}
                                    onClick={submitform}
                                    // className="contact-form-submint-btn"
                                  >
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
                  <div
                    className={
                      type == 2 ? "tab-pane fade show active" : "tab-pane fade"
                    }
                    id="change-password"
                    role="tabpanel"
                    aria-labelledby="change-password-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="setting-tab-heading-area">
                          <h2>Change Password</h2>
                        </div>
                      </div>
                    </div>
                    <div className="change-password-input-box-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="change-password-lavel-area">
                            <h2>Old Password</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="change-password-input-box">
                            <input
                              type="text"
                              onError={passwordError}
                              id="fname"
                              name="fname"
                              onChange={(e) => {
                                setPassword(e.target.value);
                                const isPasswordValid = passwordRegex.test(
                                  e.target.value,
                                );
                                setPasswordError(
                                  e.target.value != "" && !isPasswordValid,
                                );
                              }}
                              required="true"
                              value={password}
                              className={`form-control field ${
                                !passwordError ? "is-valid" : "is-invalid"
                              }`}
                              placeholder="Enter Old Password"
                            />
                            <div className="invalid-feedback">
                              {passwordError
                                ? "Please Enter Valid Password!"
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="change-password-input-box-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="change-password-lavel-area">
                            <h2>New Password</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="change-password-input-box">
                            <input
                              type="text"
                              onError={newpasswordError}
                              id="fname"
                              name="newpassword"
                              onChange={(e) => {
                                setNewpassword(e.target.value);
                                const isNewPasswordValid = passwordRegex.test(
                                  e.target.value,
                                );
                                setNewpasswordError(
                                  e.target.value != "" && !isNewPasswordValid,
                                );
                              }}
                              required="true"
                              value={newpassword}
                              className={`form-control field ${
                                !newpasswordError ? "is-valid" : "is-invalid"
                              }`}
                              placeholder="Enter New Password"
                            />
                            <div className="invalid-feedback">
                              {newpasswordError
                                ? "Password should be minimum length 6 and maximum length is 16 character!"
                                : ""}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="change-password-input-box-area">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="change-password-lavel-area">
                            <h2>Confirm Password</h2>
                          </div>
                        </div>
                        <div className="col-lg-9">
                          <div className="change-password-input-box">
                            <input
                              type="text"
                              id="fname"
                              name="confirmpassword"
                              required="true"
                              value={confirmpassword}
                              onChange={(e) =>
                                setConfirmpassword(e.target.value)
                              }
                              className="form-control is-valid"
                              placeholder="Enter Confirm Password"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="change-password-submit-area">
                      <a
                        href="javascript:void(0);"
                        onClick={ChangePassword}
                        className="submit-password-change-btn"
                      >
                        Submit
                      </a>
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

export default Settings;
