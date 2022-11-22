import React, { useEffect, useState } from "react";
import { Grid,Button,Table,TableHead,TableRow,TableCell,TableBody,Paper } from "@material-ui/core";
//import PageTitle from "../../../components/PageTitle"

import PageTitle from "../../../PageTitle/PageTitle";

import useStyles from "./style";
import { useHistory,Link  } from 'react-router-dom';
import {getMerchantList,deleteMerchant} from "./Service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function EndUser() {
var classes = useStyles();
let history = useHistory();
const [merchantList, setMerchantList] = useState([]);
const  getMerchantLists = async () =>{
  let request = {'id':localStorage.getItem("superAdminId")}
  let response = await getMerchantList(request);
  console.log(response)
  setMerchantList(response.data); 
  //console.log(response.data);
}
const deleteMerchants = async (id) => {
  let request = {'id':id}
  let response = await deleteMerchant(request)
  if(response.data.status === 200) {
    getMerchantLists();
    toast.warning(response.data.data.message);
  }
  else
  {
    toast.error(response.data.data.message);
  }
}

useEffect(()=>{
    getMerchantLists();
},[])

  return (
      <>
      <PageTitle title="End Users" button={<Button
      variant="contained"
      size="small"
      color="secondary"
      component={Link} to={"/app/merchant/add-enduser"}
    >
       Add Merchant
    </Button>} />
    <Paper elevation={4}>
      <Grid container spacing={4}>  
        <Grid item xs={12}>
          <Table className={classes.table} stickyHeader  aria-label="sticky table">
              <TableHead>
                  <TableRow className={classes.thead}>
                      <TableCell>#</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell align="center">Action</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {merchantList.map((merchant,i) => (
                  <TableRow className={classes.row}  >
                      <TableCell>{i+1}</TableCell>
                      <TableCell>{merchant.name}</TableCell>
                      <TableCell>{merchant.email}</TableCell>
                      <TableCell align="center">
                          <Button color="primary" variant="contained" size="small" style={{marginRight:10}} component={Link} to={`/app/admin/edit-merchant/${merchant.id}`}>Edit</Button>
                          <Button color="secondary" variant="contained" size="small" onClick={() => deleteMerchants(merchant.id)}>Delete</Button> 
                      </TableCell>
                  </TableRow>
                      
                ))}
              </TableBody>
          </Table>
        </Grid>
      </Grid>
      </Paper>
    </>
  );
}
