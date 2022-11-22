import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { URL } from "../../../../url/url";
import { toast } from "react-toastify";

const Endusers = () => {
  const [data, getData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // pagination
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);
  // const applicationPageCount = Math.ceil(applicationlist.length / usersPerPage)

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    GetEndUserdata();
  }, []);

  const GetEndUserdata = async () => {
    let request = {
      ownerID: localStorage.getItem("superAdminId"),
    };
    
   
    await axios
      .post(URL + "/admin/get-enduser-data", request, {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      })
      .then((res) => {
        getData(res.data.data);
        
        // console.log("endUsers @@@@@@@@@@@@@@@@@@@@");
        // console.log(res);
        // console.log("endUsers @@@@@@@@@@@@@@@@@@@@");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

 
  return (
    
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="application-detail-heading-area"
                // style={{ position: "relative", top: "20px", padding: "20px" }}
              >
                <h2>Manage End Users</h2>
              </div>
              <div className="table-data-search-box" style={{position:'absolute', right: '35px', top: '80px'}}>
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
              <div
                className="manage-admins-main-area"
                style={{ whiteSpace: "nowrap" }}
              >
                <div className="manage-admins-table-area">
                  <div className="manage-admins-table-responsive table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>End Users</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Application Name</th>
                        <th>Created On</th>
                        {/* <th>View Details</th>
                        <th>Action</th> */}
                        {/* <th>Active/Inactive</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {data
                      .filter(
                        (row) =>
                          !searchValue.length ||
                          row.name
                            .toString()
                            .toLowerCase()
                            .includes(searchValue.toString().toLowerCase()),
                      )
                        .slice(pagesVisited, pagesVisited + usersPerPage)
                        .map((item, i) => (
                          <tr>
                            <td>{i + pagesVisited + 1}</td>
                            <td>
                              <div className="user-icon-detail-area">
                                <div className="company-user-icon-area">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/demo-logo.png"
                                    }
                                    alt="company logo"
                                  />
                                </div>
                                <div className="user-name-area">
                                  <h5>
                                    <a href="#">{item.name}</a>
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                            <td>{item.application_name}</td>
                            <td>
                              {moment(item.created_at).format(
                                "DD-MM-YYYY HH:mm",
                              )}
                            </td>
                            {/* <td className="icon-position">
                              <Link
                                to={`/app/admin/enduser-details/${item.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-eye"></i>
                              </Link>
                            </td>
                            <td className="icon-position">
                              <Link
                                to={`/app/admin/edit-enduser/${item.id}`}
                                className="mange-admins-edit-btn"
                              >
                                <i className="fas fa-edit"></i>
                              </Link>
                              <a
                                href="javascript: void(0);"
                                datalist={item.id}
                                onClick={(e) => handleremove(e, item.id)}
                                className="mange-admins-dlt-btn"
                              >
                                <i className="far fa-trash-alt"></i>
                              </a>
                            </td> */}
                            {/* <td>
                              <div className="onoffswitch">
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
                              </div>
                            </td> */}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  </div>
                  <div style={{display: 'none'}}>
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
        </div>
        <footer className="footer text-center">
          {" "}
          2021 © Ample Admin brought to you by{" "}
          <a href="https://www.wrappixel.com/">wrappixel.com</a>
        </footer>
      </div>
   
  );
};

export default Endusers;
