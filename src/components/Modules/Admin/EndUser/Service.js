import { URL } from "../../../../url/url";
import axios from 'axios'
export const getMerchantList = async (id) => {
    let api = 'api/get-end-user-by-admin';
    return await axios.post(`${URL}/${api}`,id);
}
export const addMerchantAdmin = async (id) => {
    let api = 'api/add-merchant-by-admin';
    return await axios.post(`${URL}/${api}`,id);
}
export const getAdminList = async () => {
    let api = 'api/admin-list';
    return await axios.get(`${URL}/${api}`);
}

export const deleteMerchant = async (id) => {
    let api = 'api/delete-merchant';
    return await axios.post(`${URL}/${api}`,id);
}

export const getMerchantDetail = async (id) => {
    let api = 'api/merchant-details';
    return await axios.post(`${URL}/${api}/${id}`);
}

export const updateMerchant = async (id,request) => {
    let api = 'api/update-merchant-details';
    return await axios.post(`${URL}/${api}/${id}`,request);
}
