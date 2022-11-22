import React, { useEffect, useState } from "react";
import { Grid,Button,Table,TableHead,TableRow,TableCell,TableBody,Paper } from "@material-ui/core";
import PageTitle from "../../components/PageTitle";
import axios from "axios";
import useStyles from "./styles";
import MUIDataTable from "mui-datatables";
import { useHistory,Link  } from 'react-router-dom';
import {getAdminList,deleteAdmin} from "./Service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Admin() {
var classes = useStyles();
let history = useHistory();
const [adminList, setAdminList] = useState([]);
const  getAdminLists = async () =>{
  let response = await getAdminList('api/admin-list');
  setAdminList(response.data); 
}
const deleteAdmins = async (id) => {
  let request = {'id':id}
  let response = await deleteAdmin(request)
  if(response.data.status === 200) {
    getAdminLists();
    toast.warning(response.data.data.message);
    
  }
  else
  {
    toast.error(response.data.data.message);
  }
}

useEffect(()=>{
  getAdminLists();
},[])

  return (
      <div className={classes.container}>
      <PageTitle title="Admin" button={<Button
      variant="contained"
      size="medium"
      color="secondary"
      component={Link} to={"/app/add-admin"}
    >
       Add Admin
    </Button>} />
    <Paper elevation={4}>
      <Grid container spacing={4}>  
        <Grid item xs={12}>
          <Table className={classes.table} stickyHeader  aria-label="sticky table">
              <TableHead>
                  <TableRow className={classes.thead}>
                      <TableCell>#</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Phone</TableCell>
                      <TableCell align="center">Action</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
              {adminList.map((admin,i) => (
                  <TableRow className={classes.row}  >
                      <TableCell>{i+1}</TableCell>
                      <TableCell>{admin.company_name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>{admin.phone_number}</TableCell>
                      <TableCell align="center">
                          <Button color="primary" variant="contained" size="small" style={{marginRight:10}} component={Link} to={`/app/edit-admin/${admin.id}`}>Edit</Button>
                          <Button color="secondary" variant="contained" size="small" onClick={() => deleteAdmins(admin.id)}>Delete</Button> 
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
          </Table>
        </Grid>
      </Grid>
      </Paper>
    </div>
  );
}
