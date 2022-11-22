import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const EndUsersDetails = () => {
    

    // get enduser Details Api
    const[details, getDetails] = useState([])
    const{id} = useParams()
    useEffect(()=>{
        EndUsersDetails()
    },[])

    const EndUsersDetails = async()=>{
        let req = {
            'id': id,
            'user_type': 3
          }
          await axios.post('http://localhost:5000/getmerchantdetails',req,{
            Accept:'Application/json',
            'Content-Type': 'Application/json'
          }).then((res)=>{
            console.log(res)
            getDetails(res.data.data[0])
          }).catch((err)=>{
            console.log(err)
          })
    }
    console.log(details)
  return (
    <div class="page-wrapper" style={{minHeight: '250px'}}>
            
    <div class="container-fluid">
       <div class="row">
        <div class="col-lg-12">
          <div class="application-detail-heading-area">
           <h2>Enduser Details</h2> 
          </div>
          <div class="admin-detail-main-area">
           <div class="row">
            <div class="col-lg-6">
             <div class="admin-detail-list-area">
              <div class="admin-name-img-area">
               {/* <div class="admin-detail-img-area">
                <img src="images/demo-logo.png" alt="logo"/>  
                </div> */}
                <div class="admin-name-area">
                 <h4>{details.name}</h4>  
                </div>  
              </div>
              <div class="admin-contact-detail-area"> 
               <h4>Email: <span>{details.email}</span></h4>
               <h4>Phone: <span>{details.phone_number}</span></h4>
              </div>
             </div> 
            </div> 
            <div class="col-lg-6">
             <div class="admin-contact-detail-area"> 
               <h4>Date: <span>{moment(details.created_at).format('DD-MM-YYYY HH:mm')}</span></h4>
               {/* <h4>Number Of Apps: <span>{details.appcount}</span></h4> */}
               <h4>Plan: <span>Basic</span></h4>
              </div>
            </div>  
           </div>
          </div>
        </div>
        <div class="col-lg-12">
         <div class="admin-appuser-application-marchent">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
           <li class="nav-item" role="presentation">
            <button class="nav-link tab-btn active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true"><i class="fa fa-user-plus" aria-hidden="true"></i>App Users</button>
           </li>
           <li class="nav-item" role="presentation">
            <button class="nav-link tab-btn" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"><i class="fa fa-mobile" aria-hidden="true"></i>Application Lists</button>
           </li>
           {/* <li class="nav-item" role="presentation">
            <button class="nav-link tab-btn" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false"><i class="fa fa-users" aria-hidden="true"></i>Merchants</button>
           </li> */}
          </ul>
         </div>
          <div class="tab-content" id="myTabContent">
           <div class="tab-pane fade active show" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="app-user-main-heading-area">
             <h2>App Users</h2> 
            </div>  
            <div class="admin-appuser-table-area"> 
             <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Users Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Country</th>
                  <th>Auth Method</th>
                  <th>Action</th>
                  <th>Active/Inactive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Liam Smith</a></h5> 
                    </div>  
                   </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>United States</td>
                  <td>
                   <div class="face-img-area">
                    <img src="demo-face.jpg" alt="demo face"/>   
                   </div>   
                  </td> 
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-1" checked/>
                       <label class="onoffswitch-label" for="myonoffswitch-1">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Oliver Smith</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>United States</td>
                  <td>
                   <div class="face-finger-qrcode-area">
                    <img src="images/demo-finger-print.png" alt="demo face"/>   
                   </div>   
                  </td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-2" checked/>
                       <label class="onoffswitch-label" for="myonoffswitch-2">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">James Smith</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>United States</td>
                  <td>
                   <div class="face-finger-qrcode-area">
                    <img src="images/demo-qrcode-scan.png" alt="demo face"/>   
                   </div>   
                  </td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-3" checked/>
                       <label class="onoffswitch-label" for="myonoffswitch-3">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Michael Smith</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>United States</td>
                  <td>
                   <div class="face-finger-qrcode-area">
                    <img src="images/demo-qrcode-scan.png" alt="demo face"/>   
                   </div>   
                  </td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-4" checked/>
                       <label class="onoffswitch-label" for="myonoffswitch-4">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Jacob Smith</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>United States</td>
                  <td>
                   <div class="face-finger-qrcode-area">
                    <img src="images/demo-qrcode-scan.png" alt="demo face"/>   
                   </div>   
                  </td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-5" checked/>
                       <label class="onoffswitch-label" for="myonoffswitch-5">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <i class="fa fa-user" aria-hidden="true"></i>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">John Smith</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>United States</td>
                  <td>
                   <div class="face-finger-qrcode-area">
                    <img src="images/demo-qrcode-scan.png" alt="demo face"/>   
                   </div>   
                  </td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch-6" checked/>
                       <label class="onoffswitch-label" for="myonoffswitch-6">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
              </tbody>
            </table>  
           </div>   
           </div>
           <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <div class="app-user-main-heading-area">
             <h2>Application List</h2> 
            </div>  
            <div class="admin-appuser-table-area">
             <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applications Name</th>
                  <th>Created On</th>
                  <th>Merchants</th>
                  <th>App Users</th>
                  <th>View Details</th>
                  <th>Action</th>
                  <th>Active/Inactive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="srial-number">1</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <img src="images/demo-mobile-icon.png" alt="mobile icon"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="activity-setup.html">Application - 1</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>Mar 18, 2021</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                     <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 1</a></h5> 
                    </div> 
                    </div>   
                  </td>
                  <td style={{textAlign:'center'}}>1</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                   <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="application-list-1" checked=""/>
                    <label class="onoffswitch-label" for="application-list-1">
                     <span class="onoffswitch-inner"></span>
                     <span class="onoffswitch-switch"></span>
                    </label>
                   </div> 
                  </td>
                </tr>
                <tr>
                  <td class="srial-number">2</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <img src="images/demo-mobile-icon.png" alt="mobile icon"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Application - 2</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>Mar 18, 2021</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                     <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 2</a></h5> 
                    </div>
                    </div>    
                  </td>
                  <td style={{textAlign:'center'}}>5</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                   <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="application-list-2" checked=""/>
                    <label class="onoffswitch-label" for="application-list-2">
                     <span class="onoffswitch-inner"></span>
                     <span class="onoffswitch-switch"></span>
                    </label>
                   </div> 
                  </td>
                </tr>
                <tr>
                  <td class="srial-number">3</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <img src="images/demo-mobile-icon.png" alt="mobile icon"/> 
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Application - 3</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>Mar 18, 2021</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                     <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 3</a></h5> 
                    </div> 
                    </div>   
                  </td>
                  <td style={{textAlign:'center'}}>6</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                   <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="application-list-3" checked=""/>
                    <label class="onoffswitch-label" for="application-list-3">
                     <span class="onoffswitch-inner"></span>
                     <span class="onoffswitch-switch"></span>
                    </label>
                   </div> 
                  </td>
                </tr>
                <tr>
                  <td class="srial-number">4</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <img src="images/demo-mobile-icon.png" alt="mobile icon"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Application - 4</a></h5>  
                    </div>  
                   </div>   
                  </td>
                  <td>Mar 18, 2021</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                     <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 4</a></h5> 
                    </div> 
                    </div>   
                  </td>
                  <td style={{textAlign:'center'}}>10</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                   <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="application-list-4" checked=""/>
                    <label class="onoffswitch-label" for="application-list-4">
                     <span class="onoffswitch-inner"></span>
                     <span class="onoffswitch-switch"></span>
                    </label>
                   </div> 
                  </td>
                </tr>
                <tr>
                  <td class="srial-number">5</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <img src="images/demo-mobile-icon.png" alt="mobile icon"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Application - 5</a></h5> 
                    </div>  
                   </div>   
                  </td>
                  <td>Mar 18, 2021</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                     <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 5</a></h5> 
                    </div>
                    </div>    
                  </td>
                  <td style={{textAlign:'center'}}>15</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                   <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="application-list-5" checked=""/>
                    <label class="onoffswitch-label" for="application-list-5">
                     <span class="onoffswitch-inner"></span>
                     <span class="onoffswitch-switch"></span>
                    </label>
                   </div> 
                  </td>
                </tr>
                <tr>
                  <td class="srial-number">6</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="user-icon-area">
                     <img src="images/demo-mobile-icon.png" alt="mobile icon"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Application - 6</a></h5>  
                    </div>  
                   </div>   
                  </td>
                  <td>Mar 18, 2021</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                     <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 6</a></h5> 
                    </div>
                    </div>    
                  </td>
                  <td style={{textAlign:'center'}}>20</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                   <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="application-list-6" checked=""/>
                    <label class="onoffswitch-label" for="application-list-6">
                     <span class="onoffswitch-inner"></span>
                     <span class="onoffswitch-switch"></span>
                    </label>
                   </div> 
                  </td>
                </tr>
              </tbody>
            </table> 
            </div>     
           </div>
           <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
             <div class="app-user-main-heading-area">
             <h2>Merchants</h2> 
            </div> 
            <div class="admin-appuser-table-area">
             <table class="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Merchants</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Created On</th>
                  <th>View Details</th>
                  <th>Action</th>
                  <th>Active/Inactive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{textAlign: 'center'}}>1</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                      <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 1</a></h5> 
                    </div>    
                    </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>Mar 18, 2021</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="merchant-1" checked/>
                       <label class="onoffswitch-label" for="merchant-1">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>2</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                      <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 2</a></h5> 
                    </div>    
                    </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>Mar 18, 2021</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="merchant-2" checked/>
                       <label class="onoffswitch-label" for="merchant-2">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>3</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                      <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 3</a></h5> 
                    </div>    
                    </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>Mar 18, 2021</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="merchant-3" checked/>
                       <label class="onoffswitch-label" for="merchant-3">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>4</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                      <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 4</a></h5> 
                    </div>    
                    </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>Mar 18, 2021</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="merchant-4" checked/>
                       <label class="onoffswitch-label" for="merchant-4">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>5</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                      <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 5</a></h5> 
                    </div>    
                    </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>Mar 18, 2021</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="merchant-5" checked/>
                       <label class="onoffswitch-label" for="merchant-5">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
                <tr>
                  <td style={{textAlign:'center'}}>6</td>
                  <td>
                   <div class="user-icon-detail-area">
                    <div class="company-user-icon-area">
                      <img src="images/demo-logo.png" alt="company logo"/>
                    </div>
                    <div class="user-name-area">
                     <h5><a href="#">Merchant - 6</a></h5> 
                    </div>    
                    </div>
                  </td>
                  <td>john@example.com</td>
                  <td>9874563214</td>
                  <td>Mar 18, 2021</td>
                  <td style={{textAlign:'center'}}><a href="#" class="mange-admins-edit-btn"><i class="fas fa-eye"></i></a></td>
                  <td>
                      <a href="#" class="mange-admins-edit-btn"><i class="fas fa-edit"></i></a>
                      <a href="#" class="mange-admins-dlt-btn"><i class="far fa-trash-alt"></i></a>
                  </td>
                  <td>
                    <div class="onoffswitch">
                      <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="merchant-6" checked/>
                       <label class="onoffswitch-label" for="merchant-6">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                      </label>
                     </div> 
                  </td>
                </tr>
              </tbody>
            </table>
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

export default EndUsersDetails