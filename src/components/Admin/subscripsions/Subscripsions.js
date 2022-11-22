import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { URL } from '../../../url/url'

const Subscripsions = () => {
  // const[type, setType] = useState(1)
  const{id} = useParams()
  const [subscriptions_data, getSubscriptions_data] = useState([])
  
  useEffect(()=>{
    fetchSubscription()
  },[subscriptions_data])

  const fetchSubscription = () => {
    fetch(URL + "/getsubscriptions")
      .then((res) => res.json())

      .then((response) => {
        // console.log(response.data);
        getSubscriptions_data(response.data)
       
      });
  };
  // console.log(subscriptions_data)



  const deletesubscriptiondata = (th)=>{
        
    axios.post(URL + '/deletesubscription',{id:th}).then((res)=>{
        console.log(res)
        console.log("data deleted successfully")
        fetchSubscription();
    }).catch((err)=>{
      //  console.log(err)
    })
  //  console.log(id)
    
  
    // if(resp)
    // {
    //   history.push('/app/faq');
    // }
}


const handleremove =(e,th)=>{
    console.log(th)
   // console.log(e.target.attributes.getNamedItem("datalist"))
   
    alert("data deleted successfully");
    deletesubscriptiondata(th)

}


const UpdatesubscriptionStatus = async (status,subsID) =>{
  var getStatus = 1
  if(status==0)
  {
    getStatus = 1
  }
  else{
    getStatus = 0
  }
  console.log(getStatus+" , "+subsID);
  const request = {
                  'id':subsID,
                  'status':getStatus
                  };
 await axios.post(URL + "/updateSubscriptionStatus",request)
  .then((res)=>{
      console.log(res)
  }).catch((err)=>{
    console.log(err)
  })

  // updateSubscriptionStatus
}

  return (
    <div class="page-wrapper" style={{minHeight:"250px"}}>
    <div className="container-fluid">
             <div className="row">
               <div className="plan-start-btn-area" style={{position:"relative", left:"460px"}}>
               <Link to="/app/create-subscriptions" className='plan-start-btn' >Create Subscripsions</Link> 
               </div>
               {subscriptions_data.map((data)=>(
                 
                <div className="col-lg-3">
                
                  
                 <div className="subscription-box-main-area">
                 
                  <div className="subscription-price-heading-are">
                    
                   <h5 className='subscription-price-heading-are span'>{data.plan_name}</h5> 
                   <p>{data.plan_descriptions}</p>
                   <span className='subscription-price-heading-are span'>$ {data.plan_price}/ Month</span>
                  </div> 
                  <div className="about-subscription-main-area">
                   <ul>
                    <li>{data.users} user</li> 
                    <li>Upto {data.sessions} Sessions/Month</li>  
                    <li>Upto {data.app_create} Apps</li> 
                    {/* <li>Dedicated Support</li>  */}
                    <li>{data.support} Support</li> 
                   </ul> 
                   <div className="plan-start-btn-area">
                    <a href='javascript:void(0)' onClick={()=>UpdatesubscriptionStatus(data.status,data.id)} class="subscription-plan-custmize-btn">{data.status==1?'Active':'Inactive'}</a>
                   
                    <Link to={`/app/edit-subscriptions/${data.id}`} class="subscription-plan-custmize-btn">Edit</Link>
                    <a href='javascript:void(0)' datalist={data.id} onClick={e=>handleremove(e,data.id)} class="subscription-plan-custmize-btn">Delete</a>
                   </div>
                   
                  </div>
                  
                   
                 </div>
                
                 
                </div>
                 ))}  
                {/* <div className="col-lg-3">
                 <div className="subscription-box-main-area">
                  <div className="subscription-price-heading-are">
                   <h5>Basic Plans </h5> 
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                   <span>$ 5 / Month</span>
                  </div> 
                  <div className="about-subscription-main-area">
                   <ul>
                    <li>2 user</li> 
                    <li>Upto 1k Sessions/Month</li>  
                    <li>Upto 5 Apps</li> 
                    <li>Dedicated Support</li> 
                    <li>24/7 Support</li> 
                   </ul> 
                   <div className="plan-start-btn-area">
                    <a href="#" class="plan-start-btn">Get Started</a>
                   </div>
                  </div> 
                 </div>   
                </div>
                <div className="col-lg-3">
                 <div className="subscription-box-main-area">
                  <div className="subscription-price-heading-are">
                   <h5>Regular Plans </h5> 
                   <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                   <span>$ 10 / Month</span>
                  </div> 
                  <div className="about-subscription-main-area">
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
                <div className="col-lg-3">
                 <div className="subscription-box-main-area">
                  <div className="subscription-price-heading-are">
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
                   <div className="plan-start-btn-area">
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

export default Subscripsions