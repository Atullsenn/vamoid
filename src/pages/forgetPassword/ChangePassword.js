import React from 'react'

const ChangePassword = () => {
  return (
    <div class="container-fluid">
    <div class="row">
     <div class="col-lg-12">
       <div class="application-detail-heading-area">
        <h2>Change Password</h2> 
       </div>
      <div class="change-password-main-area">
       <div class="change-password-input-box-area">
        <div class="row">  
         <div class="col-lg-12">
          <div class="change-password-lavel-area">
           <h2>New Password</h2>
          </div> 
         </div> 
         <div class="col-lg-12">
          <div class="change-password-input-box">
           <input type="text" id="fname" name="fname" class="form-control" placeholder="Enter New Password"/>
          </div> 
         </div> 
        </div>
       </div>
       <div class="change-password-input-box-area">
        <div class="row">  
         <div class="col-lg-12">
          <div class="change-password-lavel-area">
           <h2>Confirm Password</h2>
          </div> 
         </div> 
         <div class="col-lg-12">
          <div class="change-password-input-box">
           <input type="text" id="fname" name="fname" class="form-control" placeholder="Enter Confirm Password"/>
          </div> 
         </div> 
        </div>
       </div>
       <div class="change-password-submit-area">
       <a href="#" class="submit-password-change-btn">Submit</a> 
      </div>
      </div> 
     </div>
   </div>
</div>
  )
}

export default ChangePassword