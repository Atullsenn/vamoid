import React, { useEffect, useState } from "react";
import { Grid, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from "react-bootstrap/Modal";
import { useHistory, Link } from 'react-router-dom';
import { addApplication, getApplicationtList, deleteApplicationRecord } from "./Service";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import './style.css'
import { URL } from "../../../../url/url";
//import moment from 'moment'
export default function ApplicationList() {
    let history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoader, setisLoader] = useState('none');
    const [applicationName, setApplicationName] = useState('');
    const [applicationList, setApplicationList] = useState([]);
    const [activeInactive, setActiveInactive] = useState(true);
    const closeModal = () => {
        setIsOpen(false);
    }


    const openAddApplicationModal = () => {
        setIsOpen(true);
    }
    const deleteApplications = async (id) => {
        let request = { 'id': id }
        let response = await deleteApplicationRecord(request)
        if (response.data.status === 200) {
            getApplicationList();
            toast.warning(response.data.data.message);
        }
        else {
            toast.error(response.data.data.message);
        }
    }

    const handleSubmit = async () => {
        if (applicationName == "") {
            toast.error('Please enter Application name');
            return false;
        }
        //setIsLoading(true);
        setisLoader('inline-block');
        let request = {
            'user_id': localStorage.getItem("superAdminId"),
            'application': applicationName,
        }
        let response = await addApplication(request)
        if (response.data.status === 200) {
            setApplicationName("");
            setIsOpen(false);
            setisLoader('none');
            toast.success(response.data.data.message);
            history.push('/app/merchant/application-lists');

        }
        else {
            toast.error(response.data.data.message);
            setisLoader('none');
        }

    };
    const getApplicationList = async () => {
        let request = { 'user_id': localStorage.getItem("superAdminId") }
        let response = await getApplicationtList(request);
        console.log(response.data);
        setApplicationList(response.data.data);
    }
    useEffect(() => {
        getApplicationList();
    }, [applicationList])

    return (
        <div style={{padding:'24px'}}>
            <Modal show={isOpen}>
                <Modal.Header>
                    <button type="button" onClick={closeModal} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </Modal.Header>
                <Modal.Body>
                    <div className="application-heading-text-area">
                        <h1>Create An Application</h1>
                        <p>Pick a name and get started!</p>
                    </div>
                    <div className="application-input-text-box">
                        <input type="text" value={applicationName} onChange={(e) => setApplicationName(e.target.value)} placeholder="Application Name" className="form-control" />
                    </div>
                    <div className="create-application-btn-area">
                        <a href="javascript:void(0)" onClick={handleSubmit} className="create-application-btn">Create Application <i style={{ display: isLoader }} className="fa fa-circle-o-notch fa-spin"></i></a>
                    </div>
                </Modal.Body>
            </Modal>
            {(applicationList.length == 0) ?
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="application-detail-heading-area">
                                <h2>Create Application</h2>
                            </div>
                            <div className="change-password-main-area">
                                <div className="create-application-main-area">
                                    <h2>No Applications found</h2>
                                    <p>Get started by creating a new Application</p>
                                </div>
                                <div className="change-password-submit-area">
                                    <a href="javascript:void(0)" onClick={openAddApplicationModal} className="submit-password-change-btn" data-bs-toggle="modal" data-bs-target="#exampleModal-search">Create Application</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="application-detail-heading-area">
                                <h2>All Applications</h2>
                            </div>
                            <div className="table-data-search-box">
                                <div className="search">
                                    <input type="text" className="searchTerm" placeholder="Search" />
                                    <button type="submit" className="searchButton">
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="application-detail-main-area">
                                <div className="application-list-create-app-btn-area">
                                    <p>Applications List</p>
                                    <div className="create-applications-btn-area">
                                        <a onClick={openAddApplicationModal} href="javascript:void(0)" className="create-application-btn" data-bs-toggle="modal" data-bs-target="#exampleModal-search">
                                            <i className="fa fa-plus-circle" aria-hidden="true"></i> Create Application</a>
                                    </div>
                                </div>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Applications Name</th>
                                            <th>Created On</th>
                                            <th>Admin</th>
                                            <th>View Details</th>
                                            <th>Action</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {applicationList.map((app, index) => {
                                            return (
                                                <tr>
                                                    <td className="srial-number">{index + 1}</td>
                                                    <td>
                                                        <div className="user-icon-detail-area">
                                                            <div className="user-icon-area">
                                                                <img src={`${URL}/uploads/apps/${app.appLogo}`} alt="mobile icon" />
                                                            </div>
                                                            <div className="user-name-area">
                                                                <h5><Link to={`/app/merchant/application-setup-activity/${app.id}`} >{app.application_name}</Link></h5>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{app.created_at}</td>
                                                    <td>
                                                        <div className="user-icon-detail-area">
                                                            <div className="company-user-icon-area">
                                                                <img src="https://laravel.com/img/logotype.min.svg" alt="company logo" />
                                                            </div>
                                                            <div className="user-name-area">
                                                                <h5><Link to={`/app/merchant/application-setup-activity/${app.id}`} >{app.name}</Link></h5>
                                                            </div>
                                                        </div></td>
                                                    <td className="text-center-padding"><Link to={`/app/merchant/application-setup-activity/${app.id}`} className="mange-admins-edit-btn"><i className="fas fa-eye"></i></Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/app/merchant/application-setup-activity/${app.id}`} className="mange-admins-edit-btn"><i className="fas fa-edit"></i></Link>
                                                        <a onClick={() => deleteApplications(app.id)} href="javascript:void(0)" className="mange-admins-dlt-btn"><i className="far fa-trash-alt"></i></a>
                                                    </td>
                                                    <td>
                                                        <BootstrapSwitchButton
                                                            checked={app.status}
                                                            onlabel='Active'
                                                            offlabel='Inactive'
                                                            onstyle="success"
                                                            onChange={() => {
                                                                setActiveInactive(!activeInactive);

                                                            }}
                                                        />
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
