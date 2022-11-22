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

toast.configure();
export default function AddMerchants() {
var classes = useStyles();
let history = useHistory();
const [isLoading, setIsLoading] = useState(false);
const [fullname, setFullName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handleSubmit = async () => {
  setIsLoading(true);
  let request = {
                  'addedby':localStorage.getItem("superAdminId"),
                  fullname: fullname,
                  email: email,
                  password:password,
                }
  let response = await addMerchantAdmin(request)
  if(response.data.status === 200) {
      setFullName("");
      setEmail("");
      setPassword("");
      toast.success(response.data.data.message);
      history.push('/app/merchant/endusers');
    
  }
  else
  {
    toast.error(response.data.data.message);
    setIsLoading(false);
  }
  
};
  return (
      <>
      <PageTitle title="Add Merchant"  />
      <Paper>
      <Box px={3} py={2}>
      <Grid container spacing={4}>        
        <Grid item xs={12} sm={12}>
        <TextField
            required
            value={fullname}
            id="fullname"
            name="fullname"
            label="Full Name"
            variant='outlined'
            fullWidth
            margin="dense"
            onChange={(e) => setFullName(e.target.value)}
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
