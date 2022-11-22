import React, {useEffect, useState,useRef } from "react";
import './style.css'
import { useHistory,useParams } from "react-router-dom";
import {getMetaDataRecord,getApplicationDetailstaWebAuth,updateValidateRegisteredUserWebAuth,rejectAuthenticationWebAuth,resendAuthenticationOtpWebAuth} from './Services'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export default function UpdateSignatureAuthenticationWithOtp()
{
    const history = useHistory();
    const Ref = useRef(null);
    const { userid,owner,appid,transaction } = useParams();
    const [metadata,setMetadata] = useState([]);
    const [apprecord,setApprecord] = useState([]);
    const [acceptTerms,SetAcceptTerms] = useState(0);
    const [privacy,SetPrivacy] = useState(0);
    const [passcode,Setpasscode] = useState('');
    const [timer, setTimer] = useState('0');
    const [showTimer,setShowtimer] = useState('none');
    const [showOtpButton,setShowOtpButton] = useState('block');
    const [receivedCode,setReceivedCode] = useState('none');
    const [textOTP,setTextOTP] = useState('Send OTP');

    const getTimeRemaining = (e) => {
        const total = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / 1000 / 60 / 60) % 24);
        return {
            total, hours, minutes, seconds
        };
    }
    const startTimer = (e) => {
        let { total, hours, minutes, seconds } 
                    = getTimeRemaining(e);
        if (total >= 0) {
  
            // update the timer
            // check if less than 10 then we need to 
            // add '0' at the beginning of the variable
            setTimer(
                 (seconds > 9 ? seconds : '0' + seconds)
            )
        }
    }
    const clearTimer = (e) => {
  
        // If you adjust it you should also need to
        // adjust the Endtime formula we are about
        // to code next    
        setTimer('60');
  
        // If you try to remove this line the 
        // updating of timer Variable will be
        // after 1000ms or 1sec
        if (Ref.current) clearInterval(Ref.current);
        const id = setInterval(() => {
            
            startTimer(e);
        }, 1000)
        
        Ref.current = id;
    }
    const getDeadTime = () => {
        let deadline = new Date();
  
        // This is where you need to adjust if 
        // you entend to add more time
        deadline.setSeconds(deadline.getSeconds() + 60);
        return deadline;
    }
    const onClickReset = () => {
        clearTimer(getDeadTime());
    }
    
    const getMetaData = async () =>{
        const request = {
                        userid:base64_decode(base64_decode(base64_decode(userid))),
                        owner:base64_decode(base64_decode(base64_decode(owner))),
                        appid:base64_decode(base64_decode(base64_decode(appid))),
                        transaction:base64_decode(base64_decode(base64_decode(transaction))),
                        }
          let response = await getMetaDataRecord(request);
          setMetadata(response.data.data)
    }
    const getAppDetails = async() =>{
        const request = {
            appid:base64_decode(base64_decode(base64_decode(appid))) 
        }
        let response = await getApplicationDetailstaWebAuth(request);
        setApprecord(response.data.data)
    }
    useEffect(()=>{
        getMetaData()
        getAppDetails();
        //clearTimer(getDeadTime());
        if(timer=='00')
            {
                setShowtimer('none');
                setReceivedCode('block');
                setShowOtpButton('block');
                setTextOTP('Resend OTP');
            }
        
    },[timer])

    const acceptAndSign = async() =>{
        if(passcode=="")
        {
            toast.error('Please enter OTP.');
            return false;
        }
        if(acceptTerms==0)
        {
            toast.error('Please accept terms and conditions.');
            return false;
        }
        if(privacy==0)
        {
            toast.error('Please  accept the privacy statement.');
            return false;
        }
        const request = {
            passcode:passcode,
            userid:base64_decode(base64_decode(base64_decode(userid))),
            owner:base64_decode(base64_decode(base64_decode(owner))),
            appid:base64_decode(base64_decode(base64_decode(appid))),
            transaction:base64_decode(base64_decode(base64_decode(transaction))),
            }
        let response = await updateValidateRegisteredUserWebAuth(request);
            console.log(response)
        if(response.data.data==2)
        {
            toast.error('Invalid OTP or may be expired passcode');            
        }
        else if(response.data.data==1)
        {
            history.push("/signaturerequestsigned");
        }
        else 
        {
            toast.error('Something went wrong');  
        }        
    }
    const rejectAuthentication = async() =>{
        if(passcode=="")
        {
            toast.error('Please enter OTP.');
            return false;
        }
        if(acceptTerms==0)
        {
            toast.error('Please accept terms and conditions.');
            return false;
        }
        if(privacy==0)
        {
            toast.error('Please  accept the privacy statement.');
            return false;
        }
        const request = {
            passcode:passcode,
            userid:base64_decode(base64_decode(base64_decode(userid))),
            owner:base64_decode(base64_decode(base64_decode(owner))),
            appid:base64_decode(base64_decode(base64_decode(appid))),
            transaction:base64_decode(base64_decode(base64_decode(transaction))),
            }
        let response = await rejectAuthenticationWebAuth(request);
        history.push("/rejectauthentication");
    }
    //sourabh
    const sendOTP =async() =>{
        // console.log('**********************************************************');
        // console.log(base64_decode(base64_decode(base64_decode(userid))))
        // console.log(base64_decode(base64_decode(base64_decode(owner))))
        // console.log(base64_decode(base64_decode(base64_decode(appid))))
        // console.log(base64_decode(base64_decode(base64_decode(transaction))))
        // console.log('**********************************************************');

        const request = {
            userid:base64_decode(base64_decode(base64_decode(userid))),
            owner:base64_decode(base64_decode(base64_decode(owner))),
            appid:base64_decode(base64_decode(base64_decode(appid))),
            transaction:base64_decode(base64_decode(base64_decode(transaction))),
            }
        let response = await resendAuthenticationOtpWebAuth(request);
        // console.log("response for resend otp!")
        // console.log(response);

        
        if(response.data.data==2)
        {
            toast.error('Something went wrong');           
        }
        else if(response.data.data==1)
        {
            setShowtimer('block');
            setShowOtpButton('none');
            setReceivedCode('none');
           // startTimer();
            clearTimer(getDeadTime());
        }
        else 
        {
            toast.error('Something went wrong');  
        } 
    }

    return <>
           <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">

      <div className="vamo-lang-change-btn">
       <ul>
        <li><a href="javascript:void(0)" onclick="" className="">English (En)</a></li>
        <li><a href="javascript:void(0)" onclick="" className="">Spanish (Es)</a></li> 
       </ul> 
      </div>    
    
     <div className="signature-request-main-area">
       <div className="signature-request-logo-area">
        <img src={process.env.PUBLIC_URL + "/assets/images/logo-4.png" } alt="logo" /> 
       </div>   
      <div className="signature-request-detail-area"> 
       <div className="signature-request-text-area">
        <h1>Signature Request</h1>
        <div className="humnao-img-area">
         <img src="https://vamo.id/backend-server/uploads/apps/2203121117241647127044.png" alt="humano" />
        </div>

        <h2><span>Name: </span> <p>{apprecord.application_name}</p></h2>
        <p><span>Description</span>:{apprecord.description}</p>
        <p>You have 60 seconds to sign</p>
        <div className="green-box-info">
          <div className="content-info-ares">
            <h3>Metadata</h3>
            <ul>
                {
                    metadata.map((meta,index)=>{
                        return(
                                <li>{meta.label}:{meta.value}</li>    
                        )
                    })
                }
            </ul>
          </div>
        </div>
        <div className="form-group">
          <p id="travelinootptimer" style={{"display":showTimer}}>{timer}</p>
          <p className="receivedTheCode" style={{"display":receivedCode,"color":"red"}} >I haven't received the code</p>
         <div className="send-otp-btn-area" style={{"display":showOtpButton}}>
          <a href="javascript:void(0)" className="send-otp-btn" onClick={sendOTP} id="sendAuthenticationOtpUpdate">{textOTP} </a>  
         </div>   
          <input type="text" value={passcode} onChange={(event)=>Setpasscode(event.target.value)}  className="form-control field" name="holdername" placeholder="" autofocus="" required="" id="passcodeEmtered" />
         </div>
       </div>
       <div className="checkbox-main-area checkbox-main-area1">
         <div className="form-group">
          <input type="checkbox" id="htmlCheckBox" checked={acceptTerms} onClick={()=>SetAcceptTerms(!acceptTerms)} />
          <label for="htmlCheckBox" ><a target="_blank" href="">Accept terms and conditions </a></label>
         </div>
       </div>
       <div className="checkbox-main-area checkbox-main-area2">
         <div className="form-group">
          <input type="checkbox" id="htmlCheckBox1" checked={privacy} onClick={()=>SetPrivacy(!privacy)} />
          <label for="htmlCheckBox1" ><a  target="_blank" href="">I have read and accept the privacy statement.</a></label>
         </div>
       </div>
       <div className="reject-accept-btn-section-area">
        <div className="row">
         <div className="col-lg-6">
          <div className="reject-accept-btn-area">
           <a href="javascript:void(0)" onClick={rejectAuthentication} className="reject-btn">Reject </a>  
          </div>   
         </div>
         <div className="col-lg-6">
          <div className="reject-accept-sing-btn-area">
           <a href="javascript:void(0)" onClick={acceptAndSign} className="accept-btn" id="submitPasscode">Accept and sign </a>  
          </div>   
         </div>
        </div>
       </div>
      </div>
     </div>    
    </div>
    
    </>
}