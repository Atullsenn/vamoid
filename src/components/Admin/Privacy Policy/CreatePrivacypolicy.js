import React,{useState, useEffect} from "react";
import axios from "axios";
import { URL } from "../../../url/url";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";


const CreatePrivacypolicy = () => {
 

   
    const [heading, setHeading] = useState([]);
    const [descriptions, setDescriptions] = useState([]);
    const [data, getData] = useState([]);
    const history = useHistory();
    


    const createPolicy = (e)=>{
        console.log(heading)
        e.preventDefault()
        axios.post(URL + "/createprivacy",{
            heading: heading,
            descriptions: descriptions,

        },{
            Accept: "application/json",
            "Content-Type": "application/json",
        }).then((res)=>{
            toast.success("Policy Created successfully")
            if(res){
            history.push('/app/privacy-policy')
            }

        }).catch((err)=>{
            console.log(err);
        })

        fetchData()

    }


    
    
  
    useEffect(() => {
      fetchData();
    }, []);

    
  
    const fetchData = () => {
      fetch( URL + "/getprivacypolicy")
        .then((res) => res.json())
  
        .then((response) => {
       
          getData(response.data[0])
          setHeading(response.data[0]['heading'])
          setDescriptions(response.data[0]['descriptions'])
        });
    };
    
      
    return (
        <>
            <div className="page-wrapper" style={{ minHeight: "250px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="application-detail-heading-area">
                                <h2>Create Privacy & Policy</h2>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="contact-notification-detail-main-area">
                                <form className="send-notifications-form-area">
                                    <div className="form-group">
                                        <label>Heading</label>
                                        <input type="text" className="form-control field" defaultValue={data.heading}  onChange={(e)=>{setHeading(e.target.value)}} name="holdername" placeholder="Enter Heading" autofocus="" required="" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" defaultValue={data.descriptions}  onChange={(e)=>{setDescriptions(e.target.value)}} placeholder="Enter Description"></textarea>
                                    </div>
                                    <div className="contact-form-submint-btn-area">
                                        <a href="#" onClick={createPolicy} className="contact-form-submint-btn">Submit</a>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>

                    
                </div>
                <footer className="footer text-center"> 2021 © Ample Admin brought to you by <a
                    href="https://www.wrappixel.com/">wrappixel.com</a>
                </footer>
            </div>
        </>
    );
};

export default CreatePrivacypolicy;