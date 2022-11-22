import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { URL } from "../../../../url/url";
import axios from "axios";
import ReactPaginate from "react-paginate";

const ManageAppusers = () => {
  const [appuser, getAppuser] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const { id } = useParams();

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(appuser.length / usersPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    getAppuserList();
  }, []);

  const getAppuserList = () => {
    let request1 = {
      ownerID: localStorage.getItem("superAdminId"),
    };
    console.log(request1);
    axios
      .post(URL + "/get-app-user", request1, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        //console.log(res);
        getAppuser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(appuser);

  const handleStatus = async (status, usersID) =>{
    var getStatus;
    if(status == 0)
    {
      getStatus = 1
    }
    else{
      getStatus = 0
    }
    
    console.log(getStatus+" , "+usersID);
    const request = {
                    'id':usersID,
                    'status':getStatus
                    };
                    //console.log("update status status status")
                   
   await axios.post(URL + "/updateAppUser",request)
    .then((res)=>{
        //console.log(res)
        getAppuserList()
    }).catch((err)=>{
      console.log(err)
    })
  
    
  }

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="application-detail-heading-area"
                style={{ position: "relative", top: "20px", padding: "20px" }}
              >
                <h2>Manage App Users</h2>
                <div
                  className="table-data-search-box"
                  style={{ position: "absolute", top: "75px", right: "10px" }}
                >
                  <div className="search">
                    <input
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="searchTerm"
                      placeholder="Search"
                    />
                    <button type="submit" className="searchButton">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
                {/* <a href="#/app/admin/add-end-user"  class="send-notifications-btn">ADD ENDUSER</a> */}
              </div>

              <div className="app-user-table-area">
                <table className="table" style={{ whiteSpace: "nowrap" }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Users Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th style={{ width: "12%" }}>Country</th>
                      <th>Auth Method</th>
                      <th>No. Of Transactions</th>
                      <th>Document Type</th>
                      <th>Document Number</th>
                      <th>Active/Inactive</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appuser.filter(
                        (row) =>
                          !searchValue.length ||
                          row.name
                            .toString()
                            .toLowerCase()
                            .includes(searchValue.toString().toLowerCase()),
                      ).slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((user, index) => {
                        return (
                          <tr>
                            <td>{index + pagesVisited + 1}</td>
                            <td>
                              <div className="user-icon-detail-area">
                                {/* <div className="user-icon-area">
             <i className="fa fa-user" aria-hidden="true"></i>
            </div> */}
                                <div className="user-name-area">
                                  <h5>
                                    <a href="#">{user.name}</a>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.country}</td>
                            <td>
                              <div className="face-img-area">
                                {/*<img src="images/demo-face.jpg" alt="demo face" /> */}
                                Web
                              </div>
                            </td>
                            <td>{user.transactionCount}</td>
                            <td>{user.documentType}</td>
                            <td>{user.documentNumber}</td>
                            <td>
                              {/* <div className="onoffswitch">
                                <input
                                  type="checkbox"
                                  name="onoffswitch"
                                  className="onoffswitch-checkbox"
                                  id="myonoffswitch-1"
                                  checked
                                />
                                <label
                                  className="onoffswitch-label"
                                  for="myonoffswitch-1"
                                >
                                  <span className="onoffswitch-inner"></span>
                                  <span className="onoffswitch-switch"></span>
                                </label>
                              </div> */}
                              <button type="button" className="subscription-plan-custmize-btn" onClick={()=>{handleStatus(user.status, user.id)}}>{user.status == 1 ? 'Active' : 'Inactive'}</button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <div style={{display: appuser.length > 5 ? 'block' : 'none' }}>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <footer className="footer text-center">
          {" "}
          2021 © Ample Admin brought to you by{" "}
          <a href="https://www.wrappixel.com/">wrappixel.com</a>
        </footer>
      </div>
    </>
  );
};

export default ManageAppusers;
