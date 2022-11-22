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
toast.configure();
const initialValue = {
    name:'',
    email:'',
    password:'',
    isLoading:false,
}

export default function EditMerchant() {
  var classes = useStyles();
  let history = useHistory();
  const { id } = useParams();
  const [admin, setAdmin] = useState(initialValue);
  const {parentID,name,email,password,isLoading} = admin;

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

  return (
      <>
      <PageTitle title="Edit Merchant"  />
      <Paper>
      <Box px={3} py={2}>
      <Grid container spacing={4}>       
        <Grid item xs={12} sm={12}>
        <TextField
            required
            value={name}
            id="name"
            name="name"
            label="Full Name"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => onValueChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextField
            required
            disabled
            value={email}
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
            value={password}
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
          onClick={handleSubmit}
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
