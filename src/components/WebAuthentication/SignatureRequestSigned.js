import React, {useEffect, useState } from "react";

export default function SignatureRequestSigned()
{
    return <>
           <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
                <div className="vamo-lang-change-btn">
                <ul>
                    <li><a href="javascript:void(0)" >English (En)</a></li>
                    <li><a href="javascript:void(0)">Spanish (Es)</a></li> 
                </ul> 
                </div> 
            <div className="signature-request-main-area account-verified-box">
            <div className="signature-request-logo-area">
                <img src={process.env.PUBLIC_URL + "/assets/images/logo-4.png" } alt="logo" /> 
            </div>   
            <div className="signature-succesfull-signed-area">
                <div className="checkbox-sign-icon-area" style={{"background": "#008000"}} >
                <i className="fa fa-check" aria-hidden="true"></i>
                </div>
                <div className="singnature-resquest-signed-msg-area">
                <p>Your transaction has been signed and your Vamoid account has been activated</p>
                <p>You can download the app and check the status of your transactions whenever you want </p>
                </div>
            </div>
            </div>    
            </div>
    </>
}