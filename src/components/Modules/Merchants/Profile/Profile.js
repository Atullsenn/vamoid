import React, { useEffect, useState } from "react";
import { Grid,Button,Table,TableHead,TableRow,TableCell,TableBody,Paper } from "@material-ui/core";
//import PageTitle from "../../../components/PageTitle"

import PageTitle from "../../../PageTitle/PageTitle";

import useStyles from "./style";
import { useHistory,Link  } from 'react-router-dom';
import {getMerchantList,deleteMerchant} from "./Service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Profile() {

var classes = useStyles();
let history = useHistory();


  return (
      <>
      <Paper elevation={8}>
            jai sri ram
      </Paper>
    </>
  );
}
