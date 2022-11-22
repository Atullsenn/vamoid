import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Moment from 'moment';
import { URL } from '../../../url/url';
const FAQDETAILS = () => {
    const { id } = useParams();

    const [data, getData] = useState([]);
    
    useEffect(()=>{
        faqDetails()
    },[])

    const faqDetails =async()=>{
        let request = { 'id': id };
        let response  = await axios.post(URL + '/getFaqDetails',request);
        console.log(response)
        getData(response.data.data[0]);
        
    }
    console.log(data)

  return (
    <>
     
          <div className="container-fluid">
             <div className="row">
              <div className="col-lg-12">
                <div className="application-detail-heading-area" style={{padding: "10px"}}>
                 <h2>FAQ Details</h2>
                </div>
                <div className="send-notifications-btn-area">
                    <a href="#/app/create-faq" className="send-notifications-btn">Create Faq</a>
                </div> 
                <div className="admin-detail-main-area">
                 <div className="row">
                  <div className="col-lg-6">
                   <div className="admin-detail-list-area">
                    <div className="admin-name-img-area">
                     {/* <div className="admin-detail-img-area">
                      <img src="images/demo-logo.png" alt="logo">  
                      </div> */}
                      <div class="admin-name-area">
                       <h4>Admin</h4>  
                      </div>  
                    </div>
                    <div className="admin-contact-detail-area"> 
                     {/* <!-- <h4>Date:<span> Mar 18, 2021</span></h4> --> */}
                     <h4>Question: <span>{data.questions}</span></h4>
                    </div>
                   </div> 
                  </div> 
                  <div className="col-lg-6">
                   <div className="contact-inquirie-area"> 
                     <h4>Date: <span>{Moment(data.date).format('DD-MM-YYYY HH:mm')}</span></h4>
                     {/* <!-- <h4>Phone: <span>9874563214</span></h4> --> */}
                    </div>
                  </div>  
                 </div>
                </div>
                <div class="contact-inquiries-massege-details">
                  {data.messages}
                 {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
                 
                 <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>   */}
                </div>
              </div>
            </div>
         </div>
         
    </>
  )
}

export default FAQDETAILS;