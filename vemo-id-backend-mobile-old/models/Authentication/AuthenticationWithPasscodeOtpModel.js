const sql = require("../../../config/dbConnection");
const metadata = require('../../Globalmetadata');
require("dotenv").config();
const nodemailer = require("nodemailer");

exports.authenticationWithPasscodeOtp = (request, result) => {
  const appUserID = request.body.appUserID;
  const transactionID = request.body.transactionID;
  const applicationID = request.body.applicationID;
  var language = request.body.language;
  const langArr = ['en','es']
  var lang = 'en';
  if( langArr.includes(language))
  {
      lang = language;
  }
console.log(appUserID)
  sql.query(
    'SELECT a.*, b.application_name, b.appLogo FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID = b.id WHERE a.id = "' +
      appUserID +
      '" AND a.applicationID= "' +
      applicationID +
      '"',
    (err, res) => {
      if (err) {
        console.log("testing");
        result(err, null);
        return;
      }

      if (res.length ===0) 
      {
        const norec =  {
            success:'false',
            message: "Invalid Request"
          }    
        result(norec,null)
        return;
      }
      const response = {
                        "appUser":res[0],
                        "metaData":metadata.Globalmetadata(request.body.appUserID,request.body.applicationID,request.body.transactionID,lang)
                        }

        setTimeout(() => {

          result(null, response);
          return;
      }, 1000);
    }
  );
}

exports.checkSecurityCode = (request, result)=>{

  sql.query('SELECT a.id,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="'+request.body.deviceToken+'" AND a.mobileSecurityCode="'+request.body.code+'"',(err, res) =>{
      if(res.length===0)
      {
        const norec =  {
                          success:'false',
                          message: "Invalid security code"
                        }    
        result(norec,null)
        return;
      }
      else
      {
        const response = {
                          status:200,
                          message:"OK"
                        }
        result(null, response);
          return;
      }

    });

}

exports.checkSecurityCodeChangeOtp = (request,result) =>{
    sql.query('SELECT a.id,a.mobileSecurityNewCodeCode,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="'+request.body.deviceToken+'" AND a.mobileSecurityCodeOtp="'+request.body.otp+'"',(err, res) =>{
      if(res.length===0)
      {
        const norec =  {
                          success:'false',
                          message: "Invalid old security code or device token"
                        }    
        result(norec,null)
        return;
      }
      else
      {

        sql.query('UPDATE tbl_app_users SET mobileSecurityCodeOtp="", mobileSecurityCode="'+res[0]['mobileSecurityNewCodeCode']+'" WHERE deviceToken="'+request.body.deviceToken+'" AND mobileSecurityCodeOtp="'+request.body.otp+'"',(err,res)=>{});
        const response = {
                          status:200,
                          message:"security code Changed successfully"
                        }
        result(null, response);
          return;
      }

    });
}

exports.createSecurityCode = (request,result) =>{
  sql.query('SELECT a.id,b.user_id FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.deviceToken="'+request.body.deviceToken+'" AND a.mobileSecurityCodeOtp="'+request.body.otp+'"',(err, res) =>{
    if(res.length===0)
    {
      const norec =  {
                        success:'false',
                        message: "Invalid Request"
                      }    
      result(norec,null)
      return;
    }
    else
    {

      sql.query('UPDATE tbl_app_users SET mobileSecurityNewCodeCode="'+request.body.code+'", mobileSecurityCode="'+request.body.code+'", appCodeAuthentication=1 WHERE deviceToken="'+request.body.deviceToken+'" ',(err,res)=>{});
      const response = {
                        status:200,
                        message:"security code created successfully"
                      }
      result(null, response);
        return;
    }

  });
}

exports.myHistory = (request,result) =>
{
  sql.query('SELECT a.id AS transactionId,a.auth_type,a.auth_status,a.transactionType,a.created_at AS datetime,b.application_name,b.appLogo,b.id AS appID,c.appAuthenticationStatus,c.id AS appUserID FROM tbl_app_users_transactions a  INNER JOIN tbl_application_list b ON a.appID=b.id INNER JOIN tbl_app_users c ON a.user_id=c.id WHERE c.deviceToken="'+request.body.deviceToken+'" ORDER BY a.id DESC',(err,res)=>{

    if(res.length===0)
    {
      const norec =  {
        success:'false',
        message: "Invalid Request"
      }    
      result(norec,null)
      return;
    }
    else
    {
      const response = {
        status:200,
        record:res
      }
      result(null, response);
      return;
    }

  })
}

exports.appRejectAuthenticationWithPasscode = (request,result) =>{
  var ipAddress = request.body.ipAddress;
  if (!req.body.deviceName && req.body.deviceName==null) {
    ipAddress = "192.168.1.109";
  }
  sql.query('SELECT id FROM tbl_app_users WHERE id="'+request.body.appUserID+'" AND applicationID="'+request.body.applicationID+'"',(err,res)=>{

    if(res.length>0)
    {
      sql.query('UPDATE tbl_app_users SET appAuthenticationStatus=0 WHERE id="'+request.body.appUserID+'" AND  applicationID="'+request.body.applicationID+'"',(err,res)=>{});

      sql.query('UPDATE tbl_app_users_transactions SET auth_status=2,ipAddress="'+ipAddress+'", device_browser="'+request.body.deviceName+'" WHERE id="'+request.body.transactionID+'"',(err,res)=>{ });

      const response = {
                        message:"Request Rejected successfully"
                      }

      result(null, response);
      return;

    }
    else
    {
      const norec =  {
        status:201,
        message: "Invalid Request"
      }    
      result(norec,null)
      return;
    }

  })
}
exports.updateDeviceToken = (request,result) =>
{
  sql.query('SELECT id,email FROM tbl_app_users WHERE email="'+request.body.email+'"',(err,res)=>{

    if(res.length>0)
    {
      sql.query('UPDATE tbl_app_users SET deviceToken="'+request.body.deviceToken+'" WHERE email="'+request.body.email+'"',(err,res)=>{ });

      const response = {
                        message:"Okay"
                        }
      result(null, response);
      return;     

    }
    else
    {
      const norec =  {
              status:201,
              message: "Invalid Email Address"
            }    
      result(norec,null)
      return;
    }

  });
}

exports.authenticateLoginAppUserByLoginType = (request,result) =>
{
  var ipAddress;
  if (!request.body.ipAddress && request.body.ipAddress==null) 
  {
    ipAddress = "192.168.1.109";
  } 
  else
  {
    ipAddress = request.body.ipAddress;
  }
  sql.query('SELECT a.id AS transactionId,a.auth_type,a.auth_status,a.transactionType,a.generatedTransactionId,a.created_at AS datetime,b.applicationID,b.application_name,b.appLogo,b.id AS appID,c.appAuthenticationStatus,c.id AS appUserID,c.appFaceAuthentication,c.appThumbAuthentication,c.appCodeAuthentication,c.name,c.email,c.phone,c.country,c.appUserSetLoginType,c.mobileSecurityCode FROM tbl_app_users_transactions a INNER JOIN tbl_application_list b ON a.appID=b.id INNER JOIN tbl_app_users c ON a.user_id=c.id WHERE c.id="'+request.body.appUserID+'" AND c.applicationID="'+request.body.applicationID+'" AND a.id="'+request.body.transactionID+'"',(err,res)=>{
    // result(null, res);
    //   return; 

    if(res.length>0)
    {
        var messagePayload = {
                              transactionID:res[0]['generatedTransactionId'],
                              responseType:"login",
                              name:res[0]['name'],
                              phone:res[0]['phone'],
                              email:res[0]['email'],
                              country:res[0]['country'],
                              metadata:[]
                              };

      sql.query('UPDATE tbl_app_users_transactions SET auth_status=3,ipAddress="'+ipAddress+'", device_browser="'+request.body.deviceName+'" WHERE id="'+res[0]['transactionId']+'"',(err,res)=>{});

      if(request.body.loginType==1 && res[0]['appFaceAuthentication']==1)
      {
        messagePayload['status'] = 'SUCCESS';
        const response = {status:200,message:"Login successfully"}
        result(null, response);
        return;
      }
      else if(request.body.loginType==2 && res[0]['appThumbAuthentication']==1)
      {
        messagePayload['status'] = 'SUCCESS';
        const response = {status:200,message:"Login successfully"}
        result(null, response);
        return;
      }
      else if(request.body.loginType==3 && res[0]['appCodeAuthentication']==1)
      {
        if (!request.body.code && request.body.code==null) 
        {
          const norec =  {
            status:201,
            success:"false",
            message: "Please Provide Code"
          }    
          result(norec,null)
          return;
        }
        if(request.body.code===res[0]['mobileSecurityCode'])
        {
          messagePayload['status'] = 'SUCCESS';
          const response = {status:200,message:"Login successfully"}
          result(null, response);
          return;
        }
        else
        {
          sql.query('UPDATE tbl_app_users_transactions SET auth_status=4,ipAddress="'+ipAddress+'", device_browser="'+request.body.deviceName+'" WHERE id="'+res[0]['transactionId']+'"',(err,res)=>{});

          messagePayload['status'] = 'Failed';
          const response = {status:201,message:"Login failed"}
          result(null, response);
          return;
        }
      }
      else
      {
        const norec =  {
          status:201,
          success:"false",
          message: "Invalid Request"
        }    
        result(norec,null)
        return;
      }
      

    }




  })
}
exports.loginAppUserWithQrCode =  (request,result) =>{
  var ipAddress;
  if (!request.body.ipAddress && request.body.ipAddress==null) 
  {
    ipAddress = "192.168.1.109";
  } 
  else
  {
    ipAddress = request.body.ipAddress;
  }
  sql.query('SELECT a.created_at AS issueAt,a.updated_at AS validatedAt,a.id AS appUserID,a.name,a.email,a.phone,a.profile_image AS userProfileImage,a.country,a.appFaceAuthentication,a.appThumbAuthentication,a.appCodeAuthentication,a.appUserSetLoginType,a.mobileSecurityCode,b.id AS appID,b.application_name,b.appLogo,b.applicationID FROM tbl_app_users a INNER JOIN tbl_application_list b ON a.applicationID=b.id WHERE a.id="'+request.body.appUserID+'" AND b.applicationID="'+request.body.applicationID+'"',(err,res)=>{
    // result(null, res);
    //   return; 
    var rondomNumber = Math.floor(Math.random() * 10000000000000000);
    if(res.length>0)
    {
        var messagePayload = {
                              transactionID:res[0]['generatedTransactionId'],
                              responseType:"login",
                              name:res[0]['name'],
                              phone:res[0]['phone'],
                              email:res[0]['email'],
                              country:res[0]['country'],
                              metadata:[]
                              };

        sql.query('INSERT INTO tbl_app_users_transactions (generatedTransactionId,appID,user_id,ipAddress,device_browser,auth_type,transactionType,auth_status) VALUES ("'+rondomNumber+'","'+res[0]['appID']+'","'+res[0]['appUserID']+'", "'+ipAddress+'", "'+request.body.deviceName+'",2,1,0) ',(err1,res1)=>{
        
       var lastTransactionID = res1['insertId'];
       if(request.body.loginType==1 && res[0]['appFaceAuthentication']==1)
       {
          messagePayload['status'] = 'SUCCESS';
          const response = {status:200,message:"Login successfully"}
          result(null, response);
          return;
       }
       else if(request.body.loginType==2 && res[0]['appThumbAuthentication']==1)
       {
          messagePayload['status'] = 'SUCCESS';
          const response = {status:200,message:"Login successfully"}
          result(null, response);
          return;
       }
       else if(request.body.loginType==3 && res[0]['appCodeAuthentication']==1)
      {
          if (!request.body.code && request.body.code==null) 
          {
            const norec =  {
              status:201,
              success:"false",
              message: "Please Provide Code"
            }    
            result(norec,null)
            return;
          }
          if(request.body.code===res[0]['mobileSecurityCode'])
          {
            messagePayload['status'] = 'SUCCESS';
            const response = {status:200,message:"Login successfully"}
            result(null, response);
            return;
          }
          else
          {
            sql.query('UPDATE tbl_app_users_transactions SET auth_status=4,ipAddress="'+ipAddress+'", device_browser="'+request.body.deviceName+'" WHERE id="'+lastTransactionID+'"',(err,res)=>{});

            messagePayload['status'] = 'Failed';
            const response = {status:201,message:"Login failed"}
            result(null, response);
            return;
          }
        }
        else
        {
          sql.query('UPDATE tbl_app_users_transactions SET auth_status=4,ipAddress="'+ipAddress+'", device_browser="'+request.body.deviceName+'" WHERE id="'+lastTransactionID+'"',(err,res)=>{});

              messagePayload['status'] = 'Failed';
              const response = {status:201,message:"Login failed"}
              result(null, response);
              return;
        }


      });
    }
    else
    {
      const norec =  {
        status:201,
        success:"false",
        message: "Invalid Request"
      }    
      result(norec,null)
      return;
    }

  })
}

//https://javascript.tutorialink.com/how-to-send-an-confirmation-email-after-registration-nodejs/
