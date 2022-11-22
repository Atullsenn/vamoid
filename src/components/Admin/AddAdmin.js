import React, {useState} from "react";
import axios from 'axios';
import {addAdmin} from "./Service";
import { URL } from "../../url/url";

import { Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress, } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import useStyles from "./styles";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory  } from 'react-router-dom';


toast.configure();
export default function AddAdmin() {
var classes = useStyles();
let history = useHistory();
const [isLoading, setIsLoading] = useState(false);
const [address, setAddress] = useState("");
const [phone_number, setPhone_number] = useState("");
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [image, setImage] = useState("");
const [country, setCountry] = useState("");
const [company_name, setCompany_name] = useState("");
const [registartion_number, setRegistartion_number] = useState("");

// form Validation
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


const formData = new FormData();
      formData.append('company_image',image);
      formData.append('email',email);
      formData.append('name',name);
      formData.append('password',password);
      formData.append('phone_number',phone_number)
      formData.append('address',address)
      formData.append('registartion_number',registartion_number)
      formData.append('country',country)
      formData.append('company_name',company_name)
      formData.append('user_type',1)
      formData.append('user_id',localStorage.getItem("superAdminId"))

      // console.log("Form data")
      // console.log(formData)
      // console.log("Form Data")


const Addadminuser = async(res)=>{
  await axios.post( URL + '/addadmin',formData,
  {
    Accept: 'Application/json',
    'Content-Type': 'multipart/form-data',
  }).then((res)=>{
    toast.success('Admin Added Successfully')
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })

  if(res){
    history.push('/app/admin/')
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
//   // path:image,
//   user_type:1,
//   user_id:localStorage.getItem("superAdminId"),
 

// },


// const handleSubmit = async () => {
//   setIsLoading(true)


  
  
//   const formData = new FormData();
//       formData.append(
//         "company_image",
//         image,
//         image.name
//       );

//       console.log("Form data")
//       console.log(formData)
//       console.log("Form Data")


  
//   let request = {
//                   name: name,
//                   email: email,
//                   password:password,
//                   phone_number:phone_number,
//                   address:address,
//                   registration_number: registartion_number,
//                   country:country,
//                   company_image:formData,
//                   company_name:company_name,
//                 }
//                 console.log("request")
//                 console.log(request)
//                 console.log("request")

                
                          
    
    




//   let response = await addAdmin(request)
//   console.log("checking response for upload admin logo")
//   console.log(response);
//   console.log("checking response for upload admin logo")

  
  






  
//   if(response.data.status === 200) {
//       //setFullName("");
//       //setEmail("");
//       //setPassword("");
//       toast.success(response.data.data.message);
//       history.push('/app/admin');
    
//   }
//   else
//   {
//     toast.error(response.data.data.message);
//     setIsLoading(false);
//   }


  
// };


  return (
      <div  style={{margin:'10px'}}>
      <PageTitle title="Add Admin"/>
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
            onChange={(e) => {setImage(e.target.files[0])
              console.log(e.target.files[0])
            }}
           
           
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
            required
            value={company_name}
            error={companyNameError}
            id="company"
            name="company"
            label="Company Name"
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={companyNameError ? 'Please Enter a valid CompanyName.' : ''}
            onChange={(e) => {setCompany_name(e.target.value)
              const isCompanyValid = textRegex.test(e.target.value);
              setCompanyNameError(e.target.value != '' && !isCompanyValid)
            }}

            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required='true'
            value={registartion_number}
            error={registrationNumberError}
            id="registrationno"
            name="registrationno"
            label="Registration No."
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={registrationNumberError ? 'Please Enter Registration Number in Integer!' : ''}
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
            helperText={addressNameError ? 'Please Enter Address Name In Maximum 25 characters!' : ''}
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
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            variant='outlined'
            fullWidth
            margin="dense"
            helperText={phoneNumberError ? 'Please Enter Number In Integer Value!' : ''}
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
            helperText={emailSeverError ? 'Please Enter a valid Email.' : ''}
            onChange={(e) => {
              setEmail(e.target.value)
              const isEmailCorrect = emailRegex.test(e.target.value);
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
          onClick={Addadminuser}
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


//http://vamo.id/vamoid/#/app/dashboard
