import React, {useEffect, useState } from "react";
import './style.css'
import { useHistory,useParams } from "react-router-dom";
import {getMetaDataRecord,getApplicationDetailstaWebAuth,validateNewRegisteredUserWebAuth,rejectAuthenticationWebAuth} from './Services'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
export default function PasscodeAuthentication()
{
    let history = useHistory();
    const { userid,owner,appid,transaction } = useParams();
    const [metadata,setMetadata] = useState([]);
    const [apprecord,setApprecord] = useState([]);
    const [acceptTerms,SetAcceptTerms] = useState(0);
    const [privacy,SetPrivacy] = useState(0);
    const [passcode,Setpasscode] = useState('');
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
    console.log(apprecord.application_name);
    useEffect(()=>{
        getMetaData()
        getAppDetails();
    },[])

    const acceptAndSign = async() =>{
        if(passcode=="")
        {
            toast.error('Please enter passcode.');
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
        let response = await validateNewRegisteredUserWebAuth(request);

        if(response.data.data==2)
        {
            toast.error('Invalid passcode or may be expired passcode');            
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
            toast.error('Please enter passcode.');
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

    return <>
         <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full"
        data-sidebar-position="absolute" data-header-position="absolute" data-boxed-layout="full">
        <div className="vamo-lang-change-btn">
       <ul>
        <li><a href="javascript:void(0)" className="">English (En)</a></li>
        <li><a href="javascript:void(0)"  className="">Spanish (Es)</a></li> 
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
        <p>You have 60 seconds to sign:</p>
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
          <label>Default passcode (ID Number/Affiliate number)</label>
          <input type="text" value={passcode} onChange={(event)=>Setpasscode(event.target.value)}  className="form-control field"  placeholder="Default passcode (ID Number/Affiliate number" autofocus="" required="" id="passcodeEmtered" />
         </div>
       </div>
       <div className="checkbox-main-area checkbox-main-area1">
         <div className="form-group">
          <input type="checkbox" id="htmlCheckBox" checked={acceptTerms} onClick={()=>SetAcceptTerms(!acceptTerms)} />
          <label for="htmlCheckBox" ><a style={{"color": "#000"}} href="javascript:void(0);">Accept terms and conditions</a></label>
         </div>
       </div>
       <div className="checkbox-main-area checkbox-main-area2">
         <div className="form-group">
          <input type="checkbox" id="htmlCheckBox1" checked={privacy} onClick={()=>SetPrivacy(!privacy)} />
          <label for="htmlCheckBox1" ><a href="javascript:void(0);" style={{"color": "#000"}}  >I have read and accept the privacy statement.</a></label>
         </div>
       </div>
       <div className="reject-accept-btn-section-area">
        <div className="row">
         <div className="col-lg-6">
          <div className="reject-accept-btn-area">
           <a href="javascript:void(0);" onClick={rejectAuthentication} className="reject-btn">Reject</a>  
          </div>   
         </div>
         <div className="col-lg-6">
          <div className="reject-accept-sing-btn-area">
           <a href="javascript:void(0);" onClick={acceptAndSign} className="accept-btn" id="submitPasscode">Accept and sign</a>  
          </div>   
         </div>
        </div>
       </div>
      </div>

     </div>    
    </div>
    </>
}