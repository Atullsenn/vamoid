import React,{useState, useEffect} from 'react';
import { URL } from '../../../../url/url';

const Subscription = () => {

  const [subscriptions_data, getSubscriptions_data] = useState([])
  // const URL = "http://localhost:5000/getsubscriptions"

  useEffect(()=>{
    fetchSubscription()
  },[subscriptions_data])

  const fetchSubscription = () => {
    fetch(URL + "/get-subscription-plan")
      .then((res) => res.json())

      .then((response) => {
        // console.log(response.data);
        getSubscriptions_data(response.data)
       
      });
  };

  return (
    <div class="page-wrapper" style={{minHeight:"250px"}}>
   
  <div class="container-fluid">
     <div class="row">
        {/* <div class="col-lg-12">
         <div class="application-detail-heading-area">
         <h2>Subscription</h2>
          <p>Upgrade your subscription plan and starting talking to more visitors</p>  
       </div>
        <div class="add-payment-heading-area">
         <h2>Add Payment Card</h2>  
       </div>
         <div class="add-card-main-area">
          
            <form action="payment.php" method="POST" id="paymentFrm">
             <div class="row">
              <div class="col-lg-3">
                <div class="form-group">
                 <label>Card Holder Name</label>
                 <div class="input-card-text-area">
                  <div class="card-img-main-area">
                   <i class="far fa-credit-card"></i> 
                  </div> 
                   <input type="text" class="form-control field" name="holdername" placeholder="Enter Card Holder Name" autofocus=""  required="" id="name"/>
                 </div>
                </div> 
              </div> 
              <div class="col-lg-3">
                <div class="form-group">
                <label>Card Number</label>
                <input type="text" class="form-control field" name="holdername" placeholder="Enter Card Number" autofocus="" required="" id="name"/>
                </div> 
              </div> 
              <div class="col-lg-3">
                <div class="form-group">
                <label>Date</label>
                <input type="text" class="form-control field" name="holdername" placeholder="Enter MM/YY" autofocus="" required="" id="name"/>
                </div> 
              </div> 
              <div class="col-lg-3">
                <div class="form-group">
                <label>CVC Number</label>
                <input type="text" class="form-control field" name="holdername" placeholder="Enter CVC Number" autofocus="" required="" id="name"/>
                </div> 
              </div> 
              <div class="card-detail-save-cancle-btn-area">
               <a href="#" class="card-detail-save-btn">Save</a> 
              </div> 
             </div>   
            </form>  
         </div> 
        </div> */}
        <div className="application-detail-heading-area">
                                <h2>Supbscriptions Plan</h2>
                            </div>
        {subscriptions_data.map((data)=>(
        <div class="col-lg-3">
          
          
         <div class="subscription-box-main-area">
          <div class="subscription-price-heading-are">
           <h5>{data.plan_name}</h5> 
           <p>{data.plan_descriptions}</p>
           <span>${data.plan_price}/Month</span>
          </div> 
          <div class="about-subscription-main-area">
           <ul>
            <li>{data.users} user</li> 
            <li>Upto {data.sessions} Sessions/Month</li>  
            <li>Upto {data.app_create} Apps</li> 
            <li>{data.support} Support</li> 
           </ul> 
           <div class="plan-start-btn-area">
            <a href="#" class="plan-start-btn">Get Started</a>
           </div>
          </div> 
         </div> 
          
        </div>
        ))} 
        
        {/* <div class="col-lg-3">
         <div class="subscription-box-main-area">
          <div class="subscription-price-heading-are">
           <h5>Basic Plans </h5> 
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           <span>$ 5 / Month</span>
          </div> 
          <div class="about-subscription-main-area">
           <ul>
            <li>2 user</li> 
            <li>Upto 1k Sessions/Month</li>  
            <li>Upto 5 Apps</li> 
            <li>Dedicated Support</li> 
            <li>24/7 Support</li> 
           </ul> 
           <div class="plan-start-btn-area">
            <a href="#" class="plan-start-btn">Get Started</a>
           </div>
          </div> 
         </div>   
        </div>
        <div class="col-lg-3">
         <div class="subscription-box-main-area">
          <div class="subscription-price-heading-are">
           <h5>Regular Plans </h5> 
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           <span>$ 10 / Month</span>
          </div> 
          <div class="about-subscription-main-area">
           <ul>
            <li>10 user</li> 
            <li>Upto 1.5k Sessions/Month</li>  
            <li>Upto 10 Apps</li> 
            <li>Dedicated Support</li> 
            <li>24/7 Support</li> 
           </ul> 
           <div class="plan-start-btn-area">
            <a href="#" class="plan-start-btn">Get Started</a>
           </div>
          </div> 
         </div>   
        </div>
        <div class="col-lg-3">
         <div class="subscription-box-main-area">
          <div class="subscription-price-heading-are">
           <h5>Premium Plans </h5> 
           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
           <span>$ 15 / Month</span>
          </div> 
          <div class="about-subscription-main-area">
           <ul>
            <li>15 user</li> 
            <li>Upto 2k Sessions/Month</li>  
            <li>Upto 15 Apps</li> 
            <li>Dedicated Support</li> 
            <li>24/7 Support</li> 
           </ul> 
           <div class="plan-start-btn-area">
            <a href="#" class="plan-start-btn">Get Started</a>
           </div>
          </div> 
         </div>   
        </div> */}
    </div>
  </div>
    
    <footer class="footer text-center"> 2021 © Ample Admin brought to you by <a
            href="https://www.wrappixel.com/">wrappixel.com</a>
    </footer>
    
</div>
  )
}

export default Subscription