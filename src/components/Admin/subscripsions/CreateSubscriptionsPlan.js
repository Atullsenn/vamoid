import React,{useState} from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { URL } from '../../../url/url';

const CreateSubscriptionsPlan = () => {
  const history = useHistory()
  const [plan_name,setPlan_name] = useState([])
  const [users, setUsers] = useState([])
  const [app_create, setApp_create] = useState([])
  const [sessions, setSessions] = useState([])
  const [support, setSupport] = useState([])
  const [plan_descriptions, setPlan_descriptions]  = useState([])
  const [plan_price, setPlan_price] = useState([])

  const createSubscriptions = (res)=>{
   
    axios.post(URL + "/createsubscriptionsplan",
    {
      plan_name: plan_name,
      users:users,
      app_create:app_create,
      sessions:sessions,
      support:support,
      plan_descriptions:plan_descriptions,
      plan_price:plan_price
    },
    {
      Accept: "application/json",
      "Content-Type": "application/json",
    },).then((res)=>{
      console.log(res.data)
      // alert("plan created successfully")
    }).catch(err=>console.log(err))

    if(res){
      history.push('/app/subscriptions')
    }
  }
  return (
    <div class="page-wrapper" style={{"min-height": "250px"}}>
    <div className="container-fluid">
    <div className="row">
       <div className="col-lg-12" >
        <div className="application-detail-heading-area" >
        <h2>Create Subscription Plan</h2>
      </div>
        <div className="add-card-main-area" style={{width:"50%", margin: "auto"}}>
         {/* <!-- <h2>Add Payment Card</h2>   --> */}
           <form action="" method="" id="paymentFrm">
            <div className="row">
             <div className="col-lg-12">
               <div className="form-group">
               <label>Plan Name</label>
               <input type="text" class="form-control field" onChange={e=>setPlan_name(e.target.value)} name="holdername" placeholder="Enter Plan Name" autofocus="" required="" id="name"/>
               </div> 
             </div> 
            
             <div className="col-lg-12">
               <div className="form-group">
               <label> No. Of Users</label>
               <input type="text" className="form-control field"  name="holdername" onChange={(e)=>setUsers(e.target.value)} placeholder="Enter Users" autofocus="" required="" id="name"/>
               </div> 
             </div> 
             <div className="col-lg-12">
               <div className="form-group">
               <label> No. Of App Create</label>
               <input type="text" className="form-control field"  name="holdername" onChange={(e)=>setApp_create(e.target.value)} placeholder="Enter App Create" autofocus="" required="" id="name"/>
               </div> 
             </div> 
             <div className="col-lg-12">
               <div className="form-group">
               <label> No. Of Sessions</label>
               <input type="text" class="form-control field"  name="holdername" onChange={(e)=>setSessions(e.target.value)} placeholder="Enter Sessions" autofocus="" required="" id="name"/>
               </div> 
             </div> 
             <div className="col-lg-12">
               <div className="form-group">
               <label>Support</label>
               <input type="text" className="form-control field"  name="holdername" onChange={(e)=>setSupport(e.target.value)} placeholder="Enter Support" autofocus="" required="" id="name"/>
               </div> 
             </div> 
             <div class="col-lg-12">
               <div class="form-group">
               <label>Plan Descriptions</label>
               <textarea type="text" class="form-control field"  name="holdername" onChange={(e)=>setPlan_descriptions(e.target.value)} placeholder="Enter Plan Descriptions" autofocus="" required="" id="name"></textarea>
               </div> 
             </div> 
             <div class="col-lg-12">
               <div class="form-group">
               <label>Plan Price</label>
               <input type="text" class="form-control field" name="holdername" onChange={e=>setPlan_price(e.target.value)} placeholder="Enter Plan Price" autofocus="" required="" id="name"/>
               </div> 
             </div> 
             <div className="card-detail-save-cancle-btn-area">
              <Link href="/app/subscriptions" onClick={createSubscriptions} class="card-detail-save-btn">Create Plan</Link> 
             </div> 
            </div>   
           </form>  
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

export default CreateSubscriptionsPlan