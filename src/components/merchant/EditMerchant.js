import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../url/url";
import {
  Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory, useParams } from "react-router-dom";
import { getMerchantDetail, updateMerchant, getAdminList } from "./Service";
toast.configure();
const initialValue = {
  parentID: "",
  name: "",
  email: "",
  password: "",
  isLoading: false,
  image:'',
  company_name:'',
  registartion_number:'',
  address:'',
  country:'',
  phone_number:'',
};

export default function EditMerchant() {
  var classes = useStyles();
  let history = useHistory();
  const { id } = useParams();
  const [admin, setAdmin] = useState(initialValue);
  const [adminList, setAdminList] = useState([]);
  const [selfAdmin, setSelfAdmin] = useState("");
  const [image,setImage] = useState("");

  // Form Validation
  const emailRegex = /^([_\-\.0-9a-zA-Z]+)@([_\-\.0-9a-zA-Z]+)\.([a-zA-Z]){2,7}$/
const [emailSeverError, setEmailServerError] = useState(false);

const textRegex = /^[a-zA-Z\s]{0,25}$/
const [companyNameError, setCompanyNameError] = useState(false)


const addressRegex = /^[#.0-9a-zA-Z\s,-]{0,50}$/
const [addressNameError, setAddressNameError] = useState(false)

const [countryNameError, setCountryNameError] = useState(false)

const registrationRegex = /^([0-9]{0,20})$/

const [registrationNumberError, setRegistrationNumberError] = useState(false)

const phoneNumberRegex = /^([0-9]{0,15})$/
const [phoneNumberError, setPhoneNumberError] = useState(false)

const [nameError, setNameError] = useState(false)

const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
const [passwordError, setPasswordError] = useState(false)

const isEnabled = !passwordError && !emailSeverError && !phoneNumberError && !countryNameError && !addressNameError && !registrationNumberError && !companyNameError &&  !nameError

  
  const {
    parentID,
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
  const getAdminLists = async () => {
    let response = await getAdminList();
    setAdminList(response.data);
  };

  const handleChangeAdmin = (event) => {
    setSelfAdmin(event.target.value);
    console.log(event.target.value);
  };
  const handleSubmit = async () => {
    //setIsLoading(true);
    setAdmin((prevState) => ({ ...prevState, isLoading: true }));
    let request = {
      parentID: parentID,
      fullname: name,
      email: email,
      password: password,
    };
    console.log(request);

    let response = await updateMerchant(id, request);
    if (response.data.status === 200) {
      toast.success(response.data.data.message);
      history.push("/app/merchants");
    } else {
      toast.error(response.data.data.message);
      setAdmin((prevState) => ({ ...prevState, isLoading: false }));
    }
  };
  const getMerchantDetails = async () => {
    const response = await getMerchantDetail(id);
    setAdmin(response.data);
  };

  const onValueChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    getMerchantDetails();
    getAdminLists();
  }, []);

  // Merchant Details Api
 
  useEffect(() => {
    merchantuserdata();
  }, []);

  const merchantuserdata = async () => {
    let req = { id: id };
    console.log(req);
    await axios
      .post( URL + "/managemerchantsdetails", req, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        console.log("hello");
        console.log(res);

        setAdmin(res.data.data[0])
      })
      .catch((err) => console.log(err));
  };
  // console.log(admin)




  // Edit Merchant Data Api
  const editMerchantDetails = async(res)=>{
    const formData = new FormData()
          formData.append('id',id);
          formData.append('name',name);
          formData.append('phone_number',phone_number);
          formData.append('address',address);
          formData.append('country',country);
          formData.append('registartion_number',registartion_number);
          formData.append('company_name',company_name);
          formData.append('password', password);
          formData.append('company_image',image);
          formData.append('email',email);
    // let request = {
    //   'id': id,
    //   'name': name,
    //   'email': email,
    //   'phone_number': phone_number,
    //   'address': address,
    //   'country': country,
    //   'registartion_number': registartion_number,
    //   'company_name': company_name,
    //   'password': password,
    // };
    await axios.post( URL + "/editmerchant",formData,{
      Accept: 'Application/json',
      'Content-Type': 'multipart/form-data',
    }).then((res)=>{
      // alert("Merchant Data Updated Successfully")
      toast.success('Merchant Updated Successfully')
      //console.log(res)
    }).catch(err=>{console.log(err)})
    if(res){
      history.push('/app/merchants')
      
    }
  }

  return (
    <div style={{margin:'10px'}}>
      <PageTitle title="Edit Merchant" />
      <Paper>
        <Box px={3} py={2}>
          <Grid container spacing={4}>
            {/* <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined" margin="dense">
                <InputLabel id="demo-simple-select-label">Admin</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="admin"
                  value={parentID}
                  label="Admin"
                  onChange={handleChangeAdmin}
                >
                  <MenuItem
                    value={JSON.parse(localStorage.getItem("superAdminId"))}
                  >
                    Self
                  </MenuItem>
                  {adminList.map((admin, i) => (
                    <MenuItem value={admin.id}>{admin.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid> */}

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
                required='true'
                error={nameError}
                value={admin.name}
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={nameError ? 'Please Enter Name in String!' : ''}
                onChange={(e) => {onValueChange(e)
                  const isNameCorrect = textRegex.test(e.target.value)
                  setNameError(!isNameCorrect)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={companyNameError}
                value={company_name}
                id="company_name"
                name="company_name"
                label="Company Name"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={companyNameError ? 'Please Enter Company Name in String!' : ''}
                onChange={(e) => {onValueChange(e)
                  const isCompanyValid = textRegex.test(e.target.value)
                  setCompanyNameError(!isCompanyValid)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={registrationNumberError}
                value={registartion_number}
                id="registartion_number"
                name="registartion_number"
                label="Registration No."
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={registrationNumberError ? ' Please Enter Registration Number in Integer Value !' : ''}
                onChange={(e) => {onValueChange(e)
                  const isRegistrationValid = registrationRegex.test(e.target.value)
                  setRegistrationNumberError(!isRegistrationValid)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={addressNameError}
                value={address}
                id="address"
                name="address"
                label="Address"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={addressNameError ? 'Please Enter Address in Maximum 25 characters!' : ''}
                onChange={(e) => {onValueChange(e)
                  const isAddressNameValid = addressRegex.test(e.target.value)
                  setAddressNameError(!isAddressNameValid)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={countryNameError}
                value={country}
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={countryNameError ? 'Please Enter Country Name in String!' : ''}
                onChange={(e) => {onValueChange(e)
                  const isCountryValid = textRegex.test(e.target.value)
                  setCountryNameError(!isCountryValid)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={phoneNumberError}
                value={phone_number}
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={phoneNumberError ? 'Please Enter Phone Number In Integer Value!' : ''}
                onChange={(e) => {onValueChange(e)
                  const isPhoneNumberValid = phoneNumberRegex.test(e.target.value)
                  setPhoneNumberError(!isPhoneNumberValid)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={emailSeverError}
                value={email}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={emailSeverError ? 'Please Enter Valid Email!' : ''}
                onChange={(e) => {onValueChange(e)
                  const isEmailCorrect = emailRegex.test(e.target.value)
                  setEmailServerError(!isEmailCorrect)
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required='true'
                error={passwordError}
                value={password}
                type="password"
                id="password"
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                margin="dense"
                helperText={passwordError ? 'Password Length Should Be minimum 6 & Maximum 16 !' : ''}
                onChange={(e) => {onValueChange(e)
                  const isPasswordValid = passwordRegex.test(e.target.value)
                  setPasswordError(!isPasswordValid)
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
                onClick={editMerchantDetails}
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
