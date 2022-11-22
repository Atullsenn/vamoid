import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useHistory,useParams,Link  } from 'react-router-dom';
import { URL } from '../../../url/url';
const EDITFAQ = () => {
  const { id } = useParams();
const history = useHistory();

const[faqdetail, getFaqdetail]  = useState([])
const [questions, setQuestions] = useState("");
const [messages, setMessages] = useState("");
useEffect(()=>{
  editGetFaq();
},[])
//console.log(faqdetail)

const editGetFaq = async () =>
{
  let request = { 'id': id };
  let response  = await axios.post(URL +'/getFaqDetails',request);
  getFaqdetail(response.data.data[0]);
  setQuestions(response.data.data[0]['questions'])
  setMessages(response.data.data[0]['messages'])

  
}


const updateFaq = async () =>
{
  let req = { 
              'id': id,
               'questions':questions,
               'messages':messages,
            };
            console.log(req);
  let resp  = await axios.put(URL +'/updatefaqdata',req);
  console.log(resp.data)
            if(resp)
            {
              history.push('/app/faq');
            }
  
}




 
  return (
    <>
    <div class="container-fluid">
             <div class="row">
              <div class="col-lg-12">
               <div class="application-detail-heading-area" style={{padding:"10px"}}>
                 <h2>UPDATE FAQ</h2> 
                </div>
                {/* <!-- <div class="send-notifications-btn-area">
                 <a href="#" class="send-notifications-btn">Send Notification</a>   
                </div> -->  */}
              </div>
              <div className="col-lg-12">
               <div className="contact-notification-detail-main-area"> 
                <form className="send-notifications-form-area"> 
                 <div className="form-group">
                  <label>Question</label>
                  <input type="text" class="form-control field" defaultValue={faqdetail.questions} onChange={e=>setQuestions(e.target.value)} name="holdername" placeholder="Enter Subject" autofocus="" required="" id="name"/>
                 </div> 
                 <div class="form-group">
                  <label>Message</label>
                  <textarea class="form-control" defaultValue={faqdetail.messages} onChange={e=>setMessages(e.target.value)}  placeholder="Enter Message"></textarea>
                 </div> 
                 <div className="contact-form-submint-btn-area">
                  <a href="javascript:void(0)" onClick={updateFaq} class="contact-form-submint-btn">Submit</a>  
                 </div>  
                </form> 
               </div> 
              </div>
            </div>
         </div>
    </>
  )
}

export default EDITFAQ