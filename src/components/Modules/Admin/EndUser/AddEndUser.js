import React, {useEffect, useState } from "react";
import { Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress } from "@material-ui/core";
  import PageTitle from "../../../PageTitle/PageTitle";
import useStyles from "./style";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory  } from 'react-router-dom';
import {addMerchantAdmin} from "./Service";
import axios from "axios";

toast.configure();
export default function AddMerchants() {
var classes = useStyles();
let history = useHistory();
const [isLoading, setIsLoading] = useState(false);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [registartion_number,setRegistartion_number] = useState("")
const [company_name, setCompany_name] = useState("")
const [address, setAddress] = useState("")
const [country, setCountry] = useState("")
const [phone_number, setPhone_number] = useState("")

const handleSubmit = async () => {
  setIsLoading(true);
  let request = {
                  'addedby':localStorage.getItem("superAdminId"),
                  name: name,
                  email: email,
                  password:password,
                  
                }
  let response = await addMerchantAdmin(request)
  if(response.data.status === 200) {
      setName("");
      setEmail("");
      setPassword("");
      toast.success(response.data.data.message);
      history.push('/app/admin/merchant');
    
  }
  else
  {
    toast.error(response.data.data.message);
    setIsLoading(false);
  }
  
};


// Add End User API

const AddEnduser = async(res)=>{
  await axios.post('http://localhost:5000/admin/add-end-user',{
    email: email,
    name: name,
    password:password,
    phone_number:phone_number,
    address:address,
    registartion_number:registartion_number,
    country:country,
    company_name:company_name,
    user_type:3,
    user_id:localStorage.getItem("superAdminId"),

  },{
    Accept: 'Application/json',
    'Content-Type': 'Application/json'
  }).then((res)=>{
    alert('Inserted Data Successfully')
    console.log(res)

  }).catch((err)=>{
    console.log(err)
  })
  if(res){
    history.push('/app/admin/endusers')
  }
}
  return (
      <>
      <PageTitle title="Add EndUser"  />
      <Paper>
      <Box px={3} py={2}>
      <Grid container spacing={4}>        
      <Grid item xs={12} sm={6}>
        <TextField
            required
            value={name}
            id="name"
            name="name"
            label="Name"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={e=>setName(e.target.value)}
            
          />
        </Grid>




        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={company_name}
            id="company"
            name="company"
            label="Company Name"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setCompany_name(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={registartion_number}
            id="registrationno"
            name="registrationno"
            label="Registration No."
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setRegistartion_number(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={address}
            id="address"
            name="address"
            label="Address"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={country}
            id="country"
            name="country"
            label="Country"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setCountry(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={phone_number}
            id="phonenumber"
            name="phonenumber"
            label="Phone Number"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setPhone_number(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={email}
            id="email"
            name="email"
            label="Email"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={password}
            type="password"
            id="password"
            name="password"
            label="Password"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
      </Grid>
      <Box mt={3}>
      {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={AddEnduser}
        >
          Save
        </Button>
        )}
      </Box>

      </Box>
      
      </Paper>
    </>
  );
}
