import React,{useEffect,useState} from 'react'
import { URL } from '../../../url/url';

const TermsAndServices = () => {
    const [data, getData] = useState([])
   
  
  useEffect(() => {
    fetchData();
  }, []);

  

  const fetchData = () => {
    fetch(URL + "/gettermsandservices")
      .then((res) => res.json())

      .then((response) => {
        console.log(response.data);
        getData(response.data)
      });
  };
//   console.log(data);
  return (
    <div class="page-wrapper" style={{minHeight:"250px"}}>
    <div class="container-fluid">
             <div className="row">
              <div className="col-lg-12">
               <div className="application-detail-heading-area" style={{position: "relative", padding: "15px"}}>
                 <h2>Terms & Conditions</h2>
                 <div class="send-notifications-btn-area">
                 <a href="#/app/create-terms-and-services" class="send-notifications-btn">Add Terms And Conditions</a>   
                </div>
               </div>
               <div className="contact-detail-main-area">
                <div className="row">
                 <div className="col-lg-12">
                  {/* <!-- <div class="contact-heading-area">

                  </div> --> */}
                  {data.map((item)=>(
                  <div className="terms-conditions-detail-area">
                      <h1>{item.heading}</h1>
                      <p>{item.descriptions}</p>
                   
                  </div>
                  ))} 
                 </div>   
                </div>
               </div>
              </div>
            </div>
         </div>

         <footer class="footer text-center"> 2021 © Ample Admin brought to you by <a
            href="https://www.wrappixel.com/">wrappixel.com</a>
    </footer>
         </div>
  )
}

export default TermsAndServices;