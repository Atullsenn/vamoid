import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../url/url";

const EditSubscription = () => {
  const { id } = useParams();
  const history = useHistory();

  const [subscriptiondata, getSubscriptiondata] = useState([]);
  const [plan, setPlan] = useState("");
  const [users, setUsers] = useState("");
  const [appcreate, setAppcreate] = useState("");
  const [sessions, setSessions] = useState("");
  const [support, setSupport] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    editGetSubscription();
  }, []);
  const editGetSubscription = async () => {
    let request = { 'id': id };
    let response = await axios.post(URL + '/readsubscription',request);
    //console.log(response.data.data[0].id)
    getSubscriptiondata(response.data.data[0]);
    setPlan(response.data.data[0]['plan_name']);
    setUsers(response.data.data[0]['users']);
    setAppcreate(response.data.data[0]['app_create']);
    setSessions(response.data.data[0]['sessions']);
    setSupport(response.data.data[0]['support']);
    setDescriptions(response.data.data[0]['plan_descriptions']);
    setPrice(response.data.data[0]['plan_price']);
  };

  const updateSubscription = async () => {
    let req = {
      'id' : id,
      'plan_name' : plan,
      'users' : users,
      'app_create' : appcreate,
      'sessions' : sessions,
      'support' : support,
      'plan_descriptions' : descriptions,
      'plan_price' : price,
    };
    console.log(req);
    let resp = await axios.post(URL + '/editsubscription',req);
    console.log(resp.data);
    if (resp) {
      history.push("/app/subscriptions");
    }
  };

  return (
    <div class="page-wrapper" style={{ "min-height": "250px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="application-detail-heading-area">
              <h2>Update Subscription Plan</h2>
            </div>
            <div
              className="add-card-main-area"
              style={{ width: "50%", margin: "auto" }}
            >
              {/* <!-- <h2>Add Payment Card</h2>   --> */}
              <form action="" method="" id="paymentFrm">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Plan Name</label>
                      <input
                        type="text"
                        class="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.plan_name}
                        placeholder="Enter Plan Name"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setPlan(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> No. Of Users</label>
                      <input
                        type="text"
                        className="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.users}
                        placeholder="Enter Users"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setUsers(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> No. Of App Create</label>
                      <input
                        type="text"
                        className="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.app_create}
                        placeholder="Enter App Create"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setAppcreate(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label> No. Of Sessions</label>
                      <input
                        type="text"
                        class="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.sessions}
                        placeholder="Enter Sessions"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setSessions(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Support</label>
                      <input
                        type="text"
                        className="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.support}
                        placeholder="Enter Support"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setSupport(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label>Plan Descriptions</label>
                      <textarea
                        type="text"
                        class="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.plan_descriptions}
                        placeholder="Enter Plan Descriptions"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setDescriptions(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <div class="col-lg-12">
                    <div class="form-group">
                      <label>Plan Price</label>
                      <input
                        type="text"
                        class="form-control field"
                        name="holdername"
                        defaultValue={subscriptiondata.plan_price}
                        placeholder="Enter Plan Price"
                        autofocus=""
                        required=""
                        id="name"
                        onChange={(e)=>setPrice(e.target.value)}
                      />
                    </div>
                  </div>
                  <div class="card-detail-save-cancle-btn-area">
                       <a  onClick={updateSubscription} href="javascript:void(0);" className="card-detail-save-btn">Edit Plan</a> 
                      </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer class="footer text-center">
        {" "}
        2021 © Ample Admin brought to you by{" "}
        <a href="https://www.wrappixel.com/">wrappixel.com</a>
      </footer>
    </div>
  );
};

export default EditSubscription;
