import React, {useState,useEffect } from "react";
import { Paper,
  Box,
  Grid,
  TextField,
  Button,
  CircularProgress,Select,MenuItem,FormControl,InputLabel  } from "@material-ui/core";
  import PageTitle from "../../../PageTitle/PageTitle";
import useStyles from "./style";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory,useParams  } from 'react-router-dom';
import {getMerchantDetail,updateMerchant,getAdminList} from "./Service";
import axios from "axios";

toast.configure();
const initialValue = {
    name:'',
    email:'',
    password:'',
    registartion_number: '',
    address:'',
    company_name: '',
    country: '',
    phone_number: '',
    isLoading:false,
}

export default function EditMerchant() {
  var classes = useStyles();
  let history = useHistory();
  const { id } = useParams();
  const [admin, setAdmin] = useState(initialValue);
  const {parentID,name,email,password,registartion_number,company_name,country,phone_number,address,isLoading} = admin;

const handleSubmit = async () => {
  //setIsLoading(true);
  setAdmin(prevState => ({ ...prevState, isLoading: true,}));
  let request = {
                  parentID:parentID,
                  fullname: name,
                  email: email,
                  password:password,
                }
    console.log(request)

  let response = await updateMerchant(id,request)  
  if(response.data.status === 200) {
      toast.success(response.data.data.message);
      history.push('/app/admin/merchant');
    
  }
  else
  {
    toast.error(response.data.data.message);
    setAdmin(prevState => ({ ...prevState, isLoading: false,}));
  }


};
const getMerchantDetails = async() => {
    const response = await getMerchantDetail(id);
    setAdmin(response.data);
}

const onValueChange = (e) => {
    setAdmin({...admin, [e.target.name]: e.target.value})
}
useEffect(() => {
    getMerchantDetails();
}, []);


//Get End User Details API

 useEffect(()=>{
  getenduserdetails()
 },[])

const getenduserdetails = async()=>{
  let req = {
    'id': id,
    'user_type': 3
  }
  await axios.post('http://localhost:5000/getmerchantdetails',req,{
    Accept:'Application/json',
    'Content-Type': 'Application/json'
  }).then((res)=>{
    console.log(res)
    setAdmin(res.data.data[0])
  }).catch((err)=>{
    console.log(err)
  })
}


// Edit End user API

const editEndUserDetails = async(res)=>{
  let requestt = {
    'id': id,
    'name': name,
    'email': email,
    'phone_number': phone_number,
    'address': address,
    'country': country,
    'registartion_number': registartion_number,
    'company_name': company_name,
    'password': password,
  };
  await axios.post("http://localhost:5000/editmerchant",requestt,{
    Accept: 'Application/json',
    'Content-Type': 'Application/json',
  }).then((res)=>{
    alert("EndUser Data Updated Successfully")
    console.log(res)
  }).catch(err=>{console.log(err)})
  if(res){
    history.push('/app/admin/endusers')
  }
}



  return (
      <>
      <PageTitle title="Edit End User"  />
      <Paper>
      <Box px={3} py={2}>
      <Grid container spacing={4}>       
      <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.name}
            id="name"
            name="name"
            label="Name"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
          
            
          />
        </Grid>




        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.company_name}
            id="company_name"
            name="company_name"
            label="Company Name"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.registartion_number}
            id="registartion_number"
            name="registartion_number"
            label="Registration No."
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.address}
            id="address"
            name="address"
            label="Address"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.country}
            id="country"
            name="country"
            label="Country"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
            
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.phone_number}
            id="phone_number"
            name="phone_number"
            label="Phone Number"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
           
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.email}
            id="email"
            name="email"
            label="Email"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
           
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
        <TextField
            required
            value={admin.password}
            type="password"
            id="password"
            name="password"
            label="Password"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
         
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
          onClick={editEndUserDetails}
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
