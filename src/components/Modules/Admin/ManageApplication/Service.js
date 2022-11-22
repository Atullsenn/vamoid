import axios from 'axios'
import { URL } from '../../../../url/url';

export const addApplication = async (id) => {
    let api = 'api/addApplication';
    return await axios.post(`${URL}/${api}`,id);
}
export const getApplicationtList = async (id) => {
    let api = 'api/applicationList';
    return await axios.post(`${URL}/${api}`,id);
}
export const deleteApplicationRecord = async (id) => {
    let api = 'api/deleteApplication';
    return await axios.post(`${URL}/${api}`,id);
}

export const getApplicationDetail = async (id) => {
    let api = '/merchant/getapplicationdetail';
    return await axios.post(`${URL}${api}/${id}`);
}

export const updateApplicationSetup = async (request) => {
    let api = 'api/updateApplicationSetUpDetails';
    return await axios.post(`${URL}${api}`,request);
}
export const getApplicationAppUserList = async (id) => {
    let api = '/get-appuserlist';
    return await axios.post(`${URL}${api}`,id);
}


export const addMetaData = async (request) => {
    let api = '/addmetadata';
    return await axios.post(`${URL}${api}`,request);
}

export const getMetaDataList = async (id) => {
    let api = '/getmetadata';
    return await axios.post(`${URL}${api}`,id);
}
export const getEditMetaData = async (id) => {
    let api = '/get-editmeta-data';
    return await axios.post(`${URL}${api}`,id);
}

export const EditMetaData = async (id) => {
    let api = '/editmetadata';
    return await axios.post(`${URL}${api}`,id);
}


export const getTransactionRecord = async (id) => {
    let api = '/getTransactionList';
    return await axios.post(`${URL}${api}`,id);
}

export const deleteMetaData = async (id) => {
    let api = '/delete-meta-data';
    return await axios.post(`${URL}${api}`,id);
}

