import React, {useEffect, useState } from "react";

export default function ExpiredAuthenticationView()
{
    return <>
           <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
    
     <div className="signature-request-main-area account-verified-box">
       <div className="signature-request-logo-area">
        <img src={process.env.PUBLIC_URL + "/assets/images/logo-4.png" } alt="logo" /> 
       </div>   
       <div className="signature-succesfull-signed-area">
        <div className="checkbox-sign-icon-area" style={{"background":"red"}}>
         <i className="fa fa-times" aria-hidden="true"></i>
        </div>
        <div className="singnature-resquest-signed-msg-area">
          <p>You may be open expired or invalid authentication link.</p>
        </div>
       </div>
      </div>    
    </div>
    
    </>
}