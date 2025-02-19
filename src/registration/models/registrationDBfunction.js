module.exports = class registrationDBfunction {
    insertDBdate(insertsql,callback) {
        try {
            // for (const key in insertsql) {
			// 	var value = insertsql[key];				
			// 	if (bmgeneric.trim(value) != '') {
			// 		if(key == 'password' || key == 'PriMobileNo' || key == 'PreVeriMobileNo' || key == 'PreVeriCountryCodeMobileNo') {
			// 			insertsql[key] = [global.AESENC,value,bmgeneric.base64_decode(PHONE_KEY)];
			// 			//insertFieldsArr[key] = "AES_ENCRYPT("+value+",'" + bmgeneric.base64_decode(PHONE_KEY) + "')";	
			// 		}
			// 	}
			// }
            var dbhost = { DBHOST: 'localhost' };
            bmDb.bmDbInsert(dbhost, DBNAME['ELEARNING'], TABLE['EUSERS'], insertsql, 1, {}, function (err, binDet) {                
                 return callback(err, binDet);
            });
        } catch (err) {
            return callback(err,null);
        }
    }
}