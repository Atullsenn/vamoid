const sql = require('../config/dbConnection');
exports.Globalmetadata = (appUserID,appID,transactionId,lang)=>{
    const resultrecord = [];
    sql.query('SELECT a.meta_value AS value, b.meta_key AS keyssss, b.metaLabel AS label, b.es_MetaLabel FROM tbl_meta_values a INNER JOIN tbl_meta_data b ON b.id=a.metaID WHERE a.transactionID="'+transactionId+'"  AND a.appUserID="'+appUserID+'" AND a.applicationID="'+appID+'" AND b.visibility=1',(err,res)=>{
            if(res.length>0)
            {
                res.forEach(e => {
                    var arr = {};
                    var values = e.value.replace(/"/g, '');
                    values = values.replace('[','');
                    values = values.replace(']','');
                    values = values.replace(/"/g,'');
                    arr["key"] = e.keyssss;
                    arr["value"] = values;
                    if(lang=='en')
                    {
                        arr["label"] = e.label;
                    }
                    else{
                        arr["label"] = e.es_MetaLabel;
                    }
                    resultrecord.push(arr)
                    
                });
            }
    });
    return resultrecord
}

exports.checkExpiredAuthentication = (transactionID) =>
{
    sql.query('SELECT id,auth_status FROM tbl_app_users_transactions WHERE id="'+transactionID+'"',(err,res)=>{
        if(res.length>0)
        {
            if(res[0]['auth_status']>0)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }
        else
        {
            return 0;
        }

    });
}
