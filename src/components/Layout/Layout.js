import React from "react";
import { Route, Switch, Redirect, withRouter, } from "react-router-dom";
import classnames from "classnames";
import { Box, IconButton, Link } from '@material-ui/core'
import Icon from '@mdi/react'

//icons
// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";

// pages
import Dashboard from "../Admin/Dashboard/Dashboard";
import ManageAdmin from "../Admin/Manage Admin/ManageAdmin";
import AdminDetails from "../Admin/Manage Admin/AdminDetails";
import ApplicationDetails from "../Admin/Manage Admin/ApplicationDetails";
import MerchantDetail from "../Admin/Manage Admin/MerchantDetails";
import ManageMerchants from "../Admin/Manage Merchants/ManageMerchants";
import MerchantDetails from "../Admin/Manage Merchants/MerchantDetails";
import MerchantApplicationDetail from "../Admin/Manage Merchants/MerchantApplicationDetail";
import Typography from "../../pages/typography";
import Maps from "../../pages/maps";
import Tables from "../../pages/tables";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";
import AddAdmin from "../Admin/AddAdmin";
import EditAdmin from "../Admin/EditAdmin";
import AddMerchant from "../merchant/AddMerchant";
import Settings from "../Admin/Settings/Settings";
import Contactus from "../Admin/Contactus/Contactus";
import ContactInquiriesDetails from "../Admin/Contactus/ContactInquiriesDetails";
import FAQ from "../Admin/FAQ/FAQ";
import TermsAndServices from "../Admin/Terms and Services/TermsAndServices";
import CreateTermsandservices from "../Admin/Terms and Services/CreateTermsandservices";
import CreatePrivacypolicy from "../Admin/Privacy Policy/CreatePrivacypolicy";
import PrivacyPolicy from "../Admin/Privacy Policy/PrivacyPolicy";
// context
import { useLayoutState } from "../../context/LayoutContext";
import EditMerchant from "../merchant/EditMerchant";
import FAQCREATE from "../Admin/FAQ/FAQCREATE";
import EDITFAQ from "../Admin/FAQ/EDITFAQ";
import FAQDETAILS from "../Admin/FAQ/FAQDETAILS";
import ContactDetails from "../Admin/Contactus/ContactDetails";
import AllNotification from "../Admin/Notifications/AllNotification";
import NotificationDetails from "../Admin/Notifications/NotificationDetails";
import CreateSubscriptionsPlan from "../Admin/subscripsions/CreateSubscriptionsPlan";
import Subscripsions from "../Admin/subscripsions/Subscripsions";
import EditSubscription from "../Admin/subscripsions/EditSubscription";

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          
          <Switch>
            <Route path="/app/dashboard" component={Dashboard} />
            <Route path="/app/admin/" component={ManageAdmin} />
            <Route path="/app/admin-details/:id" component={AdminDetails}/>
            <Route path="/app/application-detail/:id" component={ApplicationDetails}/>
            <Route path="/app/merchant-detail/:id" component={MerchantDetail}/>
            <Route path="/app/merchant-app-detail/:id" component={MerchantApplicationDetail}/>
            <Route path="/app/merchants" component={ManageMerchants} />
            <Route path="/app/merchant-details/:id" component={MerchantDetails}/>
            <Route path="/app/typography" component={Typography} />
            <Route path="/app/add-admin" component={AddAdmin} />
            <Route path="/app/edit-admin/:id" component={EditAdmin} />
            <Route path="/app/add-merchant" component={AddMerchant} />
            <Route path="/app/edit-merchant/:id" component={EditMerchant} />
            <Route path="/app/tables" component={Tables} />
            <Route exact path="/app/ui" render={() => <Redirect to="/app/ui/icons" />} />
            <Route path="/app/ui/maps" component={Maps} />
            <Route path="/app/ui/icons" component={Icons} />
            <Route path="/app/ui/charts" component={Charts} />
            <Route path="/app/settings/" component={Settings} />
            <Route path="/app/notifications" component={AllNotification} />
            <Route path="/app/notification-details/:id" component={NotificationDetails}/>
            <Route path="/app/contact-us" component={Contactus} />
            <Route path="/app/create-contact-details/" component={ContactDetails} />
            <Route path="/app/contact-inquiries-details/:id" component={ContactInquiriesDetails} />
            <Route path="/app/faq" component={FAQ} />
            <Route path="/app/update-faq/:id" component={EDITFAQ} />
            <Route path="/app/create-faq" component={FAQCREATE} />
            <Route path="/app/faq-details/:id" component={FAQDETAILS} />
            <Route path="/app/terms-and-services" component={TermsAndServices} />
            <Route path="/app/create-terms-and-services" component={CreateTermsandservices} />
            <Route path="/app/privacy-policy" component={PrivacyPolicy} />
            <Route path="/app/create-privacy-policy" component={CreatePrivacypolicy} />
            <Route path="/app/create-subscriptions" component={CreateSubscriptionsPlan}/>
            <Route path="/app/subscriptions" component={Subscripsions}/>
            <Route path="/app/edit-subscriptions/:id" component={EditSubscription} />
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
    </div >
  );
}

export default withRouter(Layout);
