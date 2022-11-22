import React,{useState,useEffect} from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { URL } from "../../../url/url";
import { toast } from "react-toastify";

const CreateTermsandservices = () => {

    const [heading, setHeading] = useState([])
    const [descriptions, setDescriptions] = useState([])
    const [data, getData] = useState([])
    const history = useHistory();
  
   // form validation
   const [headingError, setHeadinError] = useState("")
   const [descriptionsError, setDescriptionsError] = useState("")
   
  const createTerms = (e) => {
    e.preventDefault();
    Axios.post(
      URL + "/createtermsandservices",
      {
        heading: heading,
        descriptions: descriptions,
      },
      {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    )
      .then((res) => {
        toast.success("Terms and Conditions Created  Successfully");
        console.log(res);
        if(res){
          history.push('/app/terms-and-services')
        }
       
      })
      .catch((err) => {
        console.log(err);
        console.log("data not submitted");
      });

      fetchData()
      
  };


  // const URL = "http://localhost:5000/gettermsandservices";
  
  useEffect(() => {
    fetchData();
  }, []);

  

  const fetchData = () => {
    fetch(URL + "/gettermsandservices")
      .then((res) => res.json())

      .then((response) => {
        console.log(response.data[0]);
        getData(response.data[0])
        setHeading(response.data[0]['heading'])
        setDescriptions(response.data[0]['descriptions'])
      });
  };
  console.log(data);
  
    // useEffect(() => {
    //   fetchData();
    // }, []);

    
  
    // const fetchData = () => {
    //   fetch(URL)
    //     .then((res) => res.json())
  
    //     .then((response) => {
    //     //   console.log(response.data[0]);
    //       getData(response.data[0])
    //     });
    // };

  
    return (
        <>
            <div className="page-wrapper" style={{ minHeight: "250px" }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="application-detail-heading-area">
                                <h2>Create Terms & Conditions</h2>
                                
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="contact-notification-detail-main-area">
                                <form className="send-notifications-form-area">
                                    <div className="form-group">
                                        <label>Heading</label>
                                        <input type="text" className="form-control field" defaultValue={data.heading} onChange={(e)=>{setHeading(e.target.value)}} name="holdername" placeholder="Enter Heading" autofocus="" required="" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label>Description</label>
                                        <textarea className="form-control" defaultValue={data.descriptions} onChange={(e)=>{setDescriptions(e.target.value)}} placeholder="Enter Description"></textarea>
                                    </div>
                                    <div className="contact-form-submint-btn-area">
                                        <a href="#" onClick={createTerms} className="contact-form-submint-btn">Submit</a>
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

export default CreateTermsandservices;