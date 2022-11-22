import React, { useState, useEffect } from "react";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { Link, useParams } from "react-router-dom";
import { URL } from "../../../url/url";
import axios from "axios";
import Moment from "moment";
import ReactPaginate from "react-paginate";
//import toast from 'react-toastify';

const Contactus = () => {
  const [data, getData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
 

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  

  const usersPerPage = 5;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = Math.ceil(data.length / usersPerPage);
 

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(URL + '/contactinquiries')
      .then((res) => res.json())

      .then((response) => {
        // console.log("cheking contact inquries")
        // console.log(response.data);
        getData(response.data);
      });
  };
 

  const deleteinquiriesdata = (th) => {
    axios
      .post(URL + '/deleteinquiriesdata', { id: th })
      .then((res) => {
        // console.log(res);
        // console.log("data deleted successfully");
        fetchData();
      })
      .catch((err) => {
        //  console.log(err)
      });
    //  console.log(id)

    // if(resp)
    // {
    //   history.push('/app/faq');
    // }
  };

  const handleremove = (e, th) => {
    //console.log(th);
    // console.log(e.target.attributes.getNamedItem("datalist"))

    alert("Data deleted successfully");
    deleteinquiriesdata(th);
  };

  return (
    <>
      <div className="page-wrapper" style={{ minHeight: "250px" }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="application-detail-heading-area">
                <h2>Contact Inquiries</h2>
                <div
                  class="send-notifications-btn-area"
                  style={{
                    position: "absolute",
                    right: "15px",
                    top: "5px",
                    whiteSpace: "nowrap",
                  }}
                >
                  <a
                    href="#/app/create-contact-details/"
                    class="send-notifications-btn"
                  >
                    Create Contact Details
                  </a>
                </div>
                <div
                  className="table-data-search-box"
                  style={{ position: "absolute", top: "75px", right: "260px" }}
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
              </div>
              <div className="manage-admins-main-area">
                <div className="manage-admins-table-area">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Created On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.filter((row)=>
                      !searchValue.length || row.name
                      .toString()
                      .toLowerCase()
                      .includes(searchValue.toString().toLowerCase())).slice(pagesVisited,pagesVisited + usersPerPage).map((item, i) => (
                        <tr key={data.i}>
                          <td>{i + pagesVisited + 1}</td>
                          <td>
                            <div className="user-icon-detail-area">
                              {/* <div className="company-user-icon-area">
                                <img
                                  src={
                                    process.env.PUBLIC_URL +
                                    "/assets/images/demo-logo.png"
                                  }
                                  alt="company logo"
                                />
                              </div> */}
                              <div className="user-name-area">
                                <h5>
                                  <a href="#">{item.name}</a>
                                </h5>
                              </div>
                            </div>
                          </td>
                          {/* //It is a long established. */}
                          <td>{item.subject.substr(0, 20) + ".."}</td>
                          <td>{item.message.substr(0, 20) + ".."}</td>
                          <td>
                            {Moment(item.created_on).format("DD-MM-YYYY HH:mm")}
                          </td>
                          <td>
                            <Link
                              to={`/app/contact-inquiries-details/${item.id}`}
                              className="mange-admins-edit-btn"
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                            <Link
                              to={`/app/contact-us`}
                              datalist={item.id}
                              className="mange-admins-dlt-btn"
                              onClick={(e) => handleremove(e, item.id)}
                            >
                              <DeleteForever style={{ color: "#FF5C93" }} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                      
                    </tbody>
                  </table>
                  <div style={{display:data.length > 5 ? 'block' : 'none'}}>
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
    </>
  );
};

export default Contactus;
