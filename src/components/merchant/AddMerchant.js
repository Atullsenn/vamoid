import React, {useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../url/url";
import { Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,Select,MenuItem,FormControl,InputLabel } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory  } from 'react-router-dom';
import {addAdmin,getAdminList,addMerchantBySuperAdmin} from "./Service";

toast.configure();
export default function AddMerchant() {
var classes = useStyles();
let history = useHistory();
const [isLoading, setIsLoading] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [selfAdmin, setSelfAdmin] = useState('');
const [adminList,setAdminList] = useState([]);
const [registartion_number,setRegistartion_number] = useState("")
const [company_name, setCompany_name] = useState("")
const [address, setAddress] = useState("")
const [country, setCountry] = useState("")
const [phone_number, setPhone_number] = useState("")
const [image,setImage] = useState("")

//form validation
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
&& password != "" && name != "" && company_name != ""  && email != "" && phone_number != "" && country != "" && address != "" && registartion_number != ""

const getAdminLists = async () =>
{
    let response = await getAdminList();
    setAdminList(response.data);
}

const handleChangeAdmin = (event) => {
    setSelfAdmin(event.target.value);
};
const handleSubmit = async () => {
  setIsLoading(true);
  let request = {
                  selfAdmin:selfAdmin,
                  name: name,
                  email: email,
                  password:password,
                }
  let response = await addMerchantBySuperAdmin(request)
  if(response.data.status === 200) {
      setName("");
      setEmail("");
      setPassword("");
      toast.success(response.data.data.message);
      history.push('/app/merchants');
    
  }
  else
  {
    toast.error(response.data.data.message);
    setIsLoading(false);
  }
  
};

useEffect(()=>{
    getAdminLists();
},[])


const formData = new FormData()
      formData.append('company_image',image);
      formData.append('email',email);
      formData.append('name',name);
      formData.append('password',password);
      formData.append('phone_number',phone_number)
      formData.append('address',address)
      formData.append('registartion_number',registartion_number)
      formData.append('country',country)
      formData.append('company_name',company_name)
      formData.append('user_type',2)
      formData.append('user_id',localStorage.getItem("superAdminId"))
   


// Add Merchants Api
const AddMerchantuser = async(res)=>{
  await axios.post( URL + '/addmerchants',formData,
  
  {
    Accept: 'Application/json',
    'Content-Type': 'multipart/form-data',
  }).then((res)=>{
    // alert('Merchant Added Successfully')
    toast.success("Merchant Added Successfully")
    
  }).catch((err)=>{
    console.log(err)
    
  })

  if(res)
          {
            history.push('/app/merchants');
          }
 

  setAddress('')
  setEmail('')
  setCompany_name('')
  setCountry('')
  setPassword('')
  setPhone_number('')
  setRegistartion_number('')

  

}


// {
//   email: email,
//   name: name,
//   password:password,
//   phone_number:phone_number,
//   address:address,
//   registartion_number:registartion_number,
//   country:country,
//   company_name:company_name,
//   user_type:2,
//   user_id:localStorage.getItem("superAdminId"),
  

// },

  return (
      <div style={{margin:'10px'}}>
      <PageTitle title="Add Merchant"  />
      <Paper>
      <Box px={3} py={2}>
      <Grid container spacing={4}>  
      <Grid item xs={12} sm={12}>
        <label htmlFor="btn-upload">
          <input
            id="btn-upload"
            name="logo"
            style={{ display: 'none' }}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <Button
            style={{ marginTop: '10px' }}
            fullWidth
            className="btn-choose"
            variant="outlined"
            component="span" >
             Upload Company Logo
          </Button>
        </label>

        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required='true'
            error={nameError}
            value={name}
            id="name"
            name="name"
            label="Name"
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={nameError ? 'Please Enter Name in String!' : ''}
            onChange={(e) => {setName(e.target.value)
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
            id="company"
            name="company"
            label="Company Name"
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={companyNameError ? 'Please Enter Company Name in String!' : ''}
            onChange={(e) => {setCompany_name(e.target.value)
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
            id="registrationno"
            name="registrationno"
            label="Registration No."
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={registrationNumberError ? 'Please Enter Registration Number in Integer Value!' : ''}
            onChange={(e) => {setRegistartion_number(e.target.value)
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
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={addressNameError ? 'Please Enter Address in Maximum 25 characters!' : ''}
            onChange={(e) => {setAddress(e.target.value)
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
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={countryNameError ? 'Please Enter Country Name in String!' : ''}
            onChange={(e) => {setCountry(e.target.value)
              const isCountryValid  = textRegex.test(e.target.value)
              setCountryNameError(!isCountryValid)
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required='true'
            error={phoneNumberError}
            value={phone_number}
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={phoneNumberError ? 'Please Enter Phone Number In Integer Value!' : ''}
            onChange={(e) => {setPhone_number(e.target.value)
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
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={emailSeverError ? 'Please Enter Valid Email!' : ''}
            onChange={(e) => {setEmail(e.target.value)
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
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={passwordError ? 'Password Length Should Be minimum 6 & Maximum 16 !' : ''}
            onChange={(e) => {setPassword(e.target.value)
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
          onClick={AddMerchantuser}
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
