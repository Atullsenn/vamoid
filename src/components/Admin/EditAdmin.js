import React, { useState, useEffect } from "react";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import { getAdminDetail, updateAdmin } from "./Service";
import axios from "axios";
import { URL } from "../../url/url";
toast.configure();
const initialValue = {
  name: "",
  email: "",
  password: "",
  isLoading: false,
  image: "",
  company_name: "",
  registartion_number: "",
  address: "",
  country: "",
  phone_number: "",
};

export default function EditAdmin() {
  var classes = useStyles();
  let history = useHistory();
  const { id } = useParams();
  const [image,setImage] = useState("")
  const [admin, setAdmin] = useState(initialValue);
  const {
    name,
    email,
    password,
    isLoading,
    company_name,
    registartion_number,
    address,
    country,
    phone_number,
  } = admin;

  // form Validation
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/;
  const [emailSeverError, setEmailServerError] = useState(false);

  const textRegex = /^[a-zA-Z\s]{0,25}$/;
  const [companyNameError, setCompanyNameError] = useState(false);

  const addressRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/;
  const [addressNameError, setAddressNameError] = useState(false);

  const [countryNameError, setCountryNameError] = useState(false);

  const registrationRegex = /^([0-9]{0,20})$/;

  const [registrationNumberError, setRegistrationNumberError] = useState(false);

  const phoneNumberRegex = /^([0-9]{0,15})$/;
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  const [nameError, setNameError] = useState(false);

  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  const [passwordError, setPasswordError] = useState(false);

  const isEnabled =
    !passwordError &&
    !emailSeverError &&
    !phoneNumberError &&
    !countryNameError &&
    !addressNameError &&
    !registrationNumberError &&
    !companyNameError &&
    !nameError;

  const handleSubmit = async () => {
    //setIsLoading(true);
    setAdmin((prevState) => ({ ...prevState, isLoading: true }));
    let request = {
      fullname: name,
      email: email,
      password: password,
      // image:image,
      company_name: company_name,
      registartion_number: registartion_number,
      address: address,
      country: country,
      phone_number: phone_number,
    };
    let response = await updateAdmin(id, request);
    if (response.data.status === 200) {
      toast.success(response.data.data.message);
      history.push("/app/admin");
    } else {
      toast.error(response.data.data.message);
      setAdmin((prevState) => ({ ...prevState, isLoading: false }));
    }
  };
  const getAdminDetails = async () => {
    const response = await getAdminDetail(id);
    setAdmin(response.data);
  };

  const onValueChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getAdminDetails();
  }, []);

  // get Admin Data Api

  useEffect(() => {
    admindetails();
  }, []);

  const admindetails = async () => {
    let request = { id: id };

    await axios
      .post(URL + "/manageadmindetails", request, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        setAdmin(res.data.data[0]);
        console.log(res.data.data[0]);
      })
      .catch((err) => console.log(err));
  };

  // update Admin details Api

  const updateadmindata = async (res) => {
    
    const formData = new FormData();
          formData.append('id',id);
          formData.append('company_image',image);
          formData.append('email',email);
          formData.append('name',name);
          formData.append('password',password);
          formData.append('phone_number',phone_number)
          formData.append('address',address)
          formData.append('registartion_number',registartion_number)
          formData.append('country',country)
          formData.append('company_name',company_name)
          
      
    await axios
      .post(URL + "/manageupdateadmin", formData, {
        Accept: "Application/json",
        "Content-Type": "multipart/form-data",
      })
      .then((res) => {
        // console.log("checking admin edit data")
        // console.log(res);
        // console.log("checking admin edit data")
        
      })
      .catch((err) => {
        console.log(err);
      });
    if (res) {
      toast.success("Updated Successfully!");
      history.push("/app/admin/");
    }
  };

  return (
    <div style={{ margin: "10px" }}>
      <PageTitle title="Edit Admin" />
      <Paper>
        <Box px={3} py={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <label htmlFor="btn-upload">
                <input
                  id="btn-upload"
                  name="logo"
                  style={{ display: "none" }}
                  type="file"
                  // onChange={(e) => onValueChange(e)}
                  onChange={e=>{setImage(e.target.files[0])
                    console.log(e.target.files[0])
                  }}
                />
                <Button
                  style={{ marginTop: "10px" }}
                  fullWidth
                  className="btn-choose"
                  variant="outlined"
                  component="span"
                >
                  Upload Company Logo
                </Button>
              </label>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={companyNameError}
                value={admin.company_name}
                id="company_name"
                name="company_name"
                label="Company Name"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={
                  companyNameError ? "Please Enter Company Name in String!" : ""
                }
                onChange={(e) => {
                  onValueChange(e);
                  const isCompanyValid = textRegex.test(e.target.value);
                  setCompanyNameError(!isCompanyValid);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={registrationNumberError}
                value={admin.registartion_number}
                id="registartion_number"
                name="registartion_number"
                label="Registration No."
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={
                  registrationNumberError
                    ? "Please Enter Registration Number in Integer Value!"
                    : ""
                }
                onChange={(e) => {
                  onValueChange(e);
                  const isRegistrationValid = registrationRegex.test(
                    e.target.value,
                  );
                  setRegistrationNumberError(!isRegistrationValid);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={addressNameError}
                value={admin.address}
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={
                  addressNameError
                    ? "Please Enter Address Name In Maximum 25 characters!"
                    : ""
                }
                onChange={(e) => {
                  onValueChange(e);
                  const isAddressNameValid = addressRegex.test(e.target.value);
                  setAddressNameError(!isAddressNameValid);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={countryNameError}
                value={admin.country}
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={
                  countryNameError ? "Please Enter Country Name in String!" : ""
                }
                onChange={(e) => {
                  onValueChange(e);
                  const isCountryValid = textRegex.test(e.target.value);
                  setCountryNameError(!isCountryValid);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={phoneNumberError}
                value={admin.phone_number}
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={
                  phoneNumberError
                    ? "Please Enter Phone Number In Integer Value!"
                    : ""
                }
                onChange={(e) => {
                  onValueChange(e);
                  const isPhoneNumberValid = phoneNumberRegex.test(
                    e.target.value,
                  );
                  setPhoneNumberError(!isPhoneNumberValid);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={emailSeverError}
                value={admin.email}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={emailSeverError ? "Please Enter Valid Email!" : ""}
                onChange={(e) => {
                  onValueChange(e);
                  const isEmailCorrect = emailRegex.test(e.target.value);
                  setEmailServerError(!isEmailCorrect);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={passwordError}
                value={admin.password}
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={
                  passwordError
                    ? "Password Length Should Be minimum 6 & Maximum 16 !"
                    : ""
                }
                onChange={(e) => {
                  onValueChange(e);
                  const isPasswordValid = passwordRegex.test(e.target.value);
                  setPasswordError(!isPasswordValid);
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required="true"
                error={nameError}
                value={admin.name}
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={nameError ? "Please Enter Name in String!" : ""}
                onChange={(e) => {
                  onValueChange(e);
                  const isNameCorrect = textRegex.test(e.target.value);
                  setNameError(!isNameCorrect);
                }}
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={!isEnabled}
                variant="contained"
                color="primary"
                size="large"
                onClick={updateadmindata}
              >
                Save
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
}
