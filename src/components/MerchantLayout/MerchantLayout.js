import React from "react";
import {
  Route,
  Switch,
  Redirect,
  withRouter,
} from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from '@material-ui/core'
import Icon from '@mdi/react'

//icons
// styles
import useStyles from "./styles";

// components
import MerchantHeader from "../MerchantHeader";
import MerchantSidebar from "../MerchantSidebar";

// pages
import Dashboard from "../../pages/dashboard";
import EndUser from "../Modules/Merchants/EndUser/EndUser";
import AddEndUser from "../Modules/Merchants/EndUser/AddEndUser";
import Profile from "../Modules/Merchants/Profile/Profile";
import ApplicationList from "../Modules/Merchants/ManageApplication/ApplicationList";
import AllApplicationList from "../Modules/Merchants/ManageApplication/AllApplicationList";
import ApplicationActivitySetUp from "../Modules/Merchants/ManageApplication/ApplicationActivitySetUp";
import ManageSubscriptions from "../Modules/Merchants/ManageSubscriptions/ManageSubscriptions";
import Payments from "../Modules/Merchants/Payments/Payments";
import Settings from "../Modules/Merchants/Settings/Settings";
import Notifications from "../Modules/Merchants/Notifications/Notifications";
import NotificationDetails from "../Modules/Merchants/Notifications/NotificationDetails";
import Contactus from "../Modules/Merchants/ContactUs/Contactus";
import Termsandservices from "../Modules/Merchants/Terms and Services/Termsandservices";
import Privacypolicy from "../Modules/Merchants/PrivacyPolicy/Privacypolicy";
import FAQ from "../Modules/Merchants/FAQ/FAQ";
import Developersapi from "../Modules/Merchants/DevelopersApi/Developersapi";
import Logout from "../Modules/Merchants/Logout/Logout";
import ManageAppusers from "../Modules/Merchants/Manage Appusers/ManageAppusers";

// context
import { useLayoutState } from "../../context/LayoutContext";

function MerchantLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <MerchantHeader history={props.history} />
        <MerchantSidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/merchant/endusers" component={EndUser} />
            <Route path="/app/merchant/manage-appusers/" component={ManageAppusers}/>
            <Route path="/app/merchant/profile" component={Profile} />
            <Route path="/app/merchant/add-enduser" component={AddEndUser} />
            <Route path="/app/merchant/application-lists" component={ApplicationList} />
            <Route path="/app/merchant/all-application-lists/" component={AllApplicationList} />
            <Route path="/app/merchant/application-setup-activity/:id" component={ApplicationActivitySetUp} />
            <Route path="/app/merchant/managesubscriptions" component={ManageSubscriptions} />
            <Route path="/app/merchant/payments" component={Payments} />
            <Route path="/app/merchant/settings" component={Settings} />
            <Route path="/app/merchant/notifications" component={Notifications} />
            <Route path="/app/merchant/notifications-details/:id" component={NotificationDetails} />
            <Route path="/app/merchant/contact-us" component={Contactus} />
            <Route path="/app/merchant/terms-and-services" component={Termsandservices} />
            <Route path="/app/merchant/privacy-policy" component={Privacypolicy} />
            <Route path="/app/merchant/faq" component={FAQ} />
            <Route path="/app/merchant/developersapi" component={Developersapi} />
            <Route path="/app/merchant/logout" component={Logout} />
          </Switch>
          <Box
            mt={0}
            width={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent="space-between"
          >
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(MerchantLayout);
