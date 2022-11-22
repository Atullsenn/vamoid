import React, { useState, useEffect } from "react";
import DeleteForever from "@material-ui/icons/DeleteForever";
import { Link, useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Moment from "moment";
import { URL } from "../../../url/url";
import ReactPaginate from "react-paginate";
const FAQ = () => {
  const { id } = useParams();
  const history = useHistory();

  const [data, getData] = useState([]);

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
    fetch(URL + "/readfaq")
      .then((res) => res.json())
      .then((response) => {
        //   console.log(response.data);
        getData(response.data);
      });
  };
  // console.log(data)

  const deltefaqdata = (th) => {
    axios
      .post(URL + "/deletefaqdata", { id: th })
      .then((res) => {
        //console.log(res);
        //console.log("data deleted successfully");
        fetchData();
      })
      .catch((err) => {
        //  console.log(err)
      });
  };

  const handleremove = (e, th) => {
    console.log(th);
    alert("data deleted successfully");
    deltefaqdata(th);
  };
  return (
    <div className="page-wrapper" style={{ minHeight: "250px" }}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="application-detail-heading-area">
              <h2>FAQ List</h2>
            </div>
            <div className="send-notifications-btn-area">
              <a href="#/app/create-faq" className="send-notifications-btn">
                Create Faq
              </a>
            </div>
            <div className="manage-admins-main-area">
              <div className="manage-admins-table-area">
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Questions</th>
                      <th>Answers</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data
                      .slice(pagesVisited, pagesVisited + usersPerPage)
                      .map((item, i) => (
                        <tr key={i}>
                          <td>{i + pagesVisited + 1}</td>
                          <td>{item.questions.substr(0, 20) + ".."}</td>
                          <td>{item.messages.substr(0, 20) + ".."}</td>
                          <td>
                            {Moment(item.date).format("DD-MM-YYYY HH:mm")}
                          </td>
                          <td>
                            <Link
                              to={`/app/faq-details/${item.id}`}
                              className="mange-admins-edit-btn"
                            >
                              <i className="fas fa-eye"></i>
                            </Link>
                            <Link
                              to={`/app/update-faq/${item.id}`}
                              className="mange-admins-edit-btn"
                            >
                              <i className="fas fa-edit"></i>
                            </Link>
                            <Link
                              to={`/app/faq`}
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
                <div style={{ display: data.length > 5 ? "block" : "none" }}>
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

export default FAQ;


