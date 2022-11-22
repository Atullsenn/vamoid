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
import AdminHeader from "../AdminHeader";
import AdminSidebar from "../AdminSidebar";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
// import Notifications from "../../pages/notifications";
import ManageMerchants from "../Modules/Admin/Manage Merchants/ManageMerchants";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
// import Merchant from "../Modules/Admin/Merchant/Merchant";
import AddMerchants from "../Modules/Admin/Merchant/AddMerchants";
import EditMerchant from "../Modules/Admin/Merchant/EditMerchant";
import EndUser from "../Modules/Admin/EndUser/EndUser";
import Endusers from "../Modules/Admin/EndUser/Endusers";
import AddEndUser from "../Modules/Admin/EndUser/AddEndUser";
import EditEndUser from "../Modules/Admin/EndUser/EditEndUser";
import EndUsersDetails from "../Modules/Admin/EndUser/EndUsersDetails";
import Settings from "../Modules/Admin/Settings/Settings";
import DevelopersKey from "../Modules/Admin/Developerskey/Developerskey"
import Notifications from "../Modules/Admin/Notifications/Notifications"
import NotificationDetails from "../Modules/Admin/Notifications/NotificationDetails"
import Contactus from "../Modules/Admin/Contactus/Contactus";
import FAQ from "../Modules/Admin/FAQ/FAQ";
import Termsandservices from "../Modules/Admin/Terms and services/Termsandservices";
import Privacypolicy from "../Modules/Admin/Privacy Policy/Privacypolicy";
import Subscription from "../Modules/Admin/subscription/Subscription";
import ApplicationList from "../Modules/Admin/ManageApplication/ApplicationList";
import ApplicationActivitySetup from "../Modules/Admin/ManageApplication/ApplicationActivitySetup";
import MerchatAppDetails from "../Modules/Admin/Manage Merchants/MerchatAppDetails";

// context
import { useLayoutState } from "../../context/LayoutContext";
import MerchantDetails from "../Modules/Admin/Manage Merchants/MerchantDetails";

function AdminLayout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <AdminHeader history={props.history} />
        <AdminSidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/admin/merchants" component={ManageMerchants} />
            <Route path="/app/admin/merchant-app-details/:id" component={MerchatAppDetails}/>
            <Route path="/app/admin/merchant-details/:id" component={MerchantDetails}/>
            <Route path="/app/admin/add-merchant" component={AddMerchants} />
            <Route path="/app/admin/edit-merchant/:id" component={EditMerchant} />
            <Route path="/app/admin/enduser" component={EndUser} />
            <Route path="/app/admin/endusers" component={Endusers}/>
            <Route path="/app/admin/add-end-user" component={AddEndUser}/>
            <Route path="/app/admin/edit-enduser/:id" component={EditEndUser}/>
            <Route path="/app/admin/enduser-details/:id" component={EndUsersDetails}/>
            <Route path="/app/admin/application-lists" component={ApplicationList}/>
            <Route path="/app/admin/application-activity-setup/:id" component={ApplicationActivitySetup}/>
            <Route path="/app/tables" component={Tables} />
           
            <Route exact path="/app/ui" render={() => <Redirect to="/app/ui/icons" />} />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
            <Route path="/app/settings" component={Settings} />
            <Route path="/app/developers-key" component={DevelopersKey} />
            <Route path="/app/notifications" component={Notifications} />
            <Route path="/app/notification-details/:id" component={NotificationDetails}/>
            <Route path="/app/contact-us" component={Contactus} />
            <Route path="/app/faq" component={FAQ} />
            <Route path="/app/terms-and-services" component={Termsandservices} />
            <Route path="/app/privacy-policy" component={Privacypolicy} />
            <Route path="/app/subscriptions" component={Subscription}/>
            
          
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

export default withRouter(AdminLayout);
