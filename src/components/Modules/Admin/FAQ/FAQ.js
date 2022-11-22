import React,{useState, useEffect} from "react";
import { Accordion } from "react-bootstrap";
import { URL } from "../../../../url/url";

const FAQ = () => {
    const [data, getData] = useState([]);
    // const [faqdata, setDeletefaqdata] = useState([])
    // const URLL = URL + "/readfaq";
    
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      fetch(URL + '/readfaq')
        .then((res) => res.json())
  
        .then((response) => {
          console.log(response.data);
          getData(response.data);
        });
      
    };
    return (
        <>
            <div className="page-wrapper" style={{ minHeight: '250px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="application-detail-heading-area">
                                <h2>Frequently Asked Questions</h2>
                            </div>
                            <div className="faq-accordian-main-area">
                            {data.map((item)=>(
                                <div className="accordion accordion-flush" id="accordionFlushExample">
                                   
                                    <Accordion defaultActiveKey="0" >
                                    
                    
                                        <Accordion.Item eventKey="1">
                                            <Accordion.Header> {item.questions}</Accordion.Header>
                                            <Accordion.Body>
                                                {item.messages}
                                                {/* Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. */}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        {/* <Accordion.Item eventKey="1">
                                            <Accordion.Header>  Can I track the volume of tickets associated with various labels?</Accordion.Header>
                                            <Accordion.Body>
                                                Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="2">
                                            <Accordion.Header> Where can I find the volume of conversations initiated?</Accordion.Header>
                                            <Accordion.Body>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="3">
                                            <Accordion.Header>Do I need teaching experience?</Accordion.Header>
                                            <Accordion.Body>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="4">
                                            <Accordion.Header> Can I teach more than one language?</Accordion.Header>
                                            <Accordion.Body>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                            </Accordion.Body>
                                        </Accordion.Item>
                                        <Accordion.Item eventKey="5">
                                            <Accordion.Header> How much can I expect to earn from private lessons?</Accordion.Header>
                                            <Accordion.Body>
                                                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.
                                            </Accordion.Body>
                                        </Accordion.Item> */}
                                        
                                    </Accordion>
                                   
                                </div>
                                ))}
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

export default FAQ;