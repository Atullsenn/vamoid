import React from "react";

const Payments = () => {
    return (
        <>
            <div className="page-wrapper" style={{ minHeight: '250px' }}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="application-detail-heading-area">
                                <h2>Payment History</h2>
                            </div>
                            <div className="table-data-search-box">
                                <div className="search">
                                    <input type="text" className="searchTerm" placeholder="Search" />
                                    <button type="submit" className="searchButton">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="manage-admins-main-area">
                                <div className="manage-admins-table-area">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Users Name</th>
                                                <th>Plan Name</th>
                                                <th>ID Invoice</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Amount</th>
                                                <th>Payment Method</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>
                                                    <div className="user-icon-detail-area">
                                                        <div className="user-icon-area">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="user-name-area">
                                                            <h5><a href="#">Liam Smith</a></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Basic Plan</td>
                                                <td>#123412451</td>
                                                <td>Mar 18, 2021</td>
                                                <td>08:24 AM</td>
                                                <td className="face-img-area">$120</td>
                                                <td className="face-img-area">PayMe</td>
                                                <td>Completed</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>
                                                    <div className="user-icon-detail-area">
                                                        <div className="user-icon-area">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="user-name-area">
                                                            <h5><a href="#">Oliver Smith</a></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Regular Plan</td>
                                                <td>#123412452</td>
                                                <td>Mar 18, 2021</td>
                                                <td>08:45 AM</td>
                                                <td className="face-img-area">$200</td>
                                                <td className="face-img-area">FPS</td>
                                                <td>Pending</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td>
                                                    <div className="user-icon-detail-area">
                                                        <div className="user-icon-area">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="user-name-area">
                                                            <h5><a href="#">James Smith</a></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Premium Plan</td>
                                                <td>#123412453</td>
                                                <td>Mar 20, 2021</td>
                                                <td>08:50 PM</td>
                                                <td className="face-img-area">$150</td>
                                                <td className="face-img-area">Credit Card</td>
                                                <td>Canceled</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td>
                                                    <div className="user-icon-detail-area">
                                                        <div className="user-icon-area">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="user-name-area">
                                                            <h5><a href="#">Michael Smith</a></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Basic Plan</td>
                                                <td>#123412454</td>
                                                <td>Mar 5, 2021</td>
                                                <td>09:00 AM</td>
                                                <td className="face-img-area">$100</td>
                                                <td className="face-img-area">PayPal</td>
                                                <td>Completed</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td>
                                                    <div className="user-icon-detail-area">
                                                        <div className="user-icon-area">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="user-name-area">
                                                            <h5><a href="#">Jacob Smith</a></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Regular Plan</td>
                                                <td>#123412457</td>
                                                <td>Mar 18, 2021</td>
                                                <td>09:00 AM</td>
                                                <td className="face-img-area">$145</td>
                                                <td className="face-img-area">PayPal</td>
                                                <td>Pending</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td>
                                                    <div className="user-icon-detail-area">
                                                        <div className="user-icon-area">
                                                            <i className="fa fa-user" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="user-name-area">
                                                            <h5><a href="#">John Smith</a></h5>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>Premium Plan</td>
                                                <td>#123412458</td>
                                                <td>Mar 27, 2021</td>
                                                <td>09:00 AM</td>
                                                <td className="face-img-area">$250</td>
                                                <td className="face-img-area">Credit Card</td>
                                                <td>Canceled</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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

export default Payments;