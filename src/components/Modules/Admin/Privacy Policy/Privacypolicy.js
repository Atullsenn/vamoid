import React,{useEffect,useState} from 'react';
import { URL } from '../../../../url/url';

const Privacypolicy = () => {

    const [data, getData] = useState([]);
   
  
    useEffect(() => {
      fetchData();
    }, []);

    
  
    const fetchData = () => {
      fetch( URL + "/getprivacypolicy")
        .then((res) => res.json())
  
        .then((response) => {
        //   console.log(response.data[0]);
          getData(response.data)
        });
    };
    console.log(data)
    return (
        <>
            <div class="page-wrapper" style={{ minHeight: '250px' }}>
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="application-detail-heading-area">
                                <h2>Privacy & Policy</h2>
                            </div>
                            <div class="contact-detail-main-area">
                                <div class="row">
                                    <div class="col-lg-12">
                                        {data.map((item)=>(
                                        <div class="terms-conditions-detail-area">
                                            <h1>{item.heading}</h1>
                                            <p>{item.descriptions}</p>

                                            {/* <h1>2. To Whom Does This Privacy Policy Apply?</h1>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose</p>

                                            <h1>3. What Personal Data Do We Process?</h1>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

                                            <h1>4. The Collection, Process, And Use Of Personal Data</h1>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p> */}
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
        </>
    );
};

export default Privacypolicy;