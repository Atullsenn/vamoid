import React from 'react'

const ForgetPassword = () => {
  return (
    <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
         <div className="forget-password-detail-area">
          <div className="forget-password-left-area">
           <img src="images/logo-img.png" alt="logo-img"/> 
          </div> 
           <div className="forget-password-input-area">
            <h2>Trouble Logging In?</h2> 
            <p>Please provide your email address that you used when you signed up for your account. We will send you an email that will allow you to reset your password.</p>
            <input type="text" id="fname" name="fname" className="form-control" placeholder="Enter Email ID"/>
            <div className="email-submit-btn-area">
             <a href="#" className="email-submit-btn">Submit</a>   
            </div>
            <div className="footer-copyright-main-area">
             <p>© 2021 VamoId, LLC. All rights reserved.</p>   
            </div>
          </div> 
         </div>   
       
    </div>
  )
}

export default ForgetPassword