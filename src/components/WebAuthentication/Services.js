import axios from "axios";
import { URL } from "../../url/url";

export const getMetaDataRecord = async (resquest) =>{
    let api = "webAuth/getMetadata/";
    return await axios.post(`${URL}/${api}`,resquest);

}
export const getApplicationDetailstaWebAuth = async (resquest) =>{
    let api = "webAuth/getApplicationDetailstaWebAuth/";
    return await axios.post(`${URL}/${api}`,resquest);

}
export const validateNewRegisteredUserWebAuth = async (resquest) =>{
    let api = "webAuth/validateNewRegisteredUserWebAuth/";
    return await axios.post(`${URL}/${api}`,resquest);

}
export const rejectAuthenticationWebAuth = async (resquest) =>{
    let api = "webAuth/rejectAuthenticationWebAuth/";
    return await axios.post(`${URL}/${api}`,resquest);

}

export const updateValidateRegisteredUserWebAuth = async (resquest) =>{
    let api = "webAuth/updateValidateRegisteredUserWebAuth/";
    return await axios.post(`${URL}/${api}`,resquest);

}
export const resendAuthenticationOtpWebAuth = async (resquest) =>{
    // console.log(resquest)
    let api = "webAuth/resendAuthenticationOtpWebAuth/";
    return await axios.post(`${URL}/${api}`,resquest);
    

}



