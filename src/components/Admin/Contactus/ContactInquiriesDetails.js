import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { URL } from '../../../url/url';

const ContactInquiriesDetails = () => {

  const { id } = useParams();
    const [inquiry, getInquiryDetails] = useState([])

    useEffect(()=>{
      showdetails()
    },[])
    
    const showdetails = async ()=>
    {
      let request = {'id': id}
      //console.log(request);
      let response = await axios.post(URL+"/getinquiriesdetails",request)
      //console.log(response.data.data[0]['id'])
      
      getInquiryDetails(response.data.data[0])
    
    }
  return (
    <div className="container-fluid">
             <div className="row">
              <div className="col-lg-12">
                <div className="application-detail-heading-area" style={{padding: "10px"}}>
                 <h2>Contact Inquiries Details</h2>
                </div>
                {/* <!-- <div class="table-data-search-box">
                 <div className="search">
                  <input type="text" class="searchTerm" placeholder="Search"/>
                  <button type="submit" class="searchButton">
                  <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                 </div>  
                </div> --> */}
                <div className="admin-detail-main-area">
                 <div className="row">
                  <div className="col-lg-6">
                   <div className="admin-detail-list-area">
                    <div className="admin-name-img-area">
                     {/* <div className="admin-detail-img-area">
                      <img src="images/demo-logo.png" alt="logo"/>  
                      </div> */}
                      <div className="company-user-icon-area">
                                                            <img src={process.env.PUBLIC_URL + "/assets/images/demo-logo.png"} alt="company logo" />
                                                        </div>





                      <div className="admin-name-area">
                       <h4>{inquiry.name}</h4>  
                      </div>  
                    </div>
                    <div className="admin-contact-detail-area"> 
                     <h4>Email: <span>{inquiry.email}</span></h4>
                     <h4>Subject: <span>{inquiry.subject}</span></h4>
                    </div>
                   </div> 
                  </div> 
                  <div className="col-lg-6">
                   <div className="contact-inquirie-area"> 
                     <h4>Date: <span>{Moment(inquiry.date).format('DD-MM-YYYY HH:mm')}</span></h4>
                     <h4>Phone: <span>{inquiry.phone_number}</span></h4>
                    </div>
                  </div>  
                 </div>
                </div>
                <div className="contact-inquiries-massege-details">
                  {inquiry.message}
                 {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> 
                 
                 <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>   */}
                </div>
              </div>
            </div>
         </div>
  )
}

export default ContactInquiriesDetails