import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";
import AdminLayout from "./AdminLayout";
import MerchantLayout from "./MerchantLayout";
import handleSubmit from "./Admin/AddAdmin"

// pages
import Error from "../pages/error";
import Login from "../pages/login";

// context
import { useUserState } from "../context/UserContext";
import UpdateSignatureAuthenticationWithOtp from "./WebAuthentication/UpdateSignatureAuthenticationWithOtp"
import ExpiredAuthenticationView from "./WebAuthentication/ExpiredAuthenticationView";
import PasscodeAuthentication from "./WebAuthentication/PasscodeAuthentication";
import RejectAuthentication from "./WebAuthentication/RejectAuthentication";
import SignatureRequestSigned from "./WebAuthentication/SignatureRequestSigned";
export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  var { isUserType } = useUserState();
  if (isUserType == 0) {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route exact path="/passcodeauthentication/:userid/:owner/:appid/:transaction" component={PasscodeAuthentication} />
          <Route exact path="/updatesignatureauthenticationwithotp/:userid/:owner/:appid/:transaction" component={UpdateSignatureAuthenticationWithOtp} />
          <Route exact path="/expired_authentication_uri" component={ExpiredAuthenticationView} />
          <Route exact path="/rejectauthentication" component={RejectAuthentication} />
          <Route exact path="/signaturerequestsigned" component={SignatureRequestSigned} />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  }
  else if (isUserType == 1) {
    return (
      <HashRouter>
        <Switch>
         
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route exact path="/passcodeauthentication/:userid/:owner/:appid/:transaction" component={PasscodeAuthentication} />
          <Route exact path="/updatesignatureauthenticationwithotp/:userid/:owner/:appid/:transaction" component={UpdateSignatureAuthenticationWithOtp} />
          <Route exact path="/expired_authentication_uri" component={ExpiredAuthenticationView} />
          <Route exact path="/rejectauthentication" component={RejectAuthentication} />
          <Route exact path="/signaturerequestsigned" component={SignatureRequestSigned} />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PrivateRoute path="/app" component={AdminLayout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  }
  else if (isUserType == 2) {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route exact path="/passcodeauthentication/:userid/:owner/:appid/:transaction" component={PasscodeAuthentication} />
          <Route exact path="/updatesignatureauthenticationwithotp/:userid/:owner/:appid/:transaction" component={UpdateSignatureAuthenticationWithOtp} />
          <Route exact path="/expired_authentication_uri" component={ExpiredAuthenticationView} />
          <Route exact path="/rejectauthentication" component={RejectAuthentication} />
          <Route exact path="/signaturerequestsigned" component={SignatureRequestSigned} />
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PrivateRoute path="/app" component={MerchantLayout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  }
  else {
    return (
      
      <HashRouter>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
          <Route exact path="/passcodeauthentication/:userid/:owner/:appid/:transaction" component={PasscodeAuthentication} />
          <Route exact path="/updatesignatureauthenticationwithotp/:userid/:owner/:appid/:transaction" component={UpdateSignatureAuthenticationWithOtp} />
          <Route exact path="/expired_authentication_uri" component={ExpiredAuthenticationView} />
          <Route exact path="/rejectauthentication" component={RejectAuthentication} />
          <Route exact path="/signaturerequestsigned" component={SignatureRequestSigned} />
          
          <Route
            exact
            path="/app"
            render={() => <Redirect to="/app/dashboard" />}
          />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    );
  }

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
