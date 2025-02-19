module.exports = class loginDBFunctions {
    DBcheck(email, callback) {
        console.log("email========", email);
        try {//dbHost, dbName, tableName, selectFields, whereClause, whereValueArr
            let outputresponse = {}
            var dbhost = { DBHOST: 'localhost' };
            var selectFields = "*";
            // var whereClause = "PriMobileNo=" + bmdbfunc.bmfuncEncryptValues('phone');
            // var whereClause = "PriMobileCountryCode=? and PriMobileNo=" + bmdbfunc.bmfuncEncryptValues('phone');
            var whereClause = "email=?";//"{}";
            var whereClauseVal = [email];
            var qrycmt = "NBID Geting From MATRIIDINFO Table";
            bmDb.bmDbSelect(dbhost, DBNAME['ELEARNING'], TABLE['EUSERS'], selectFields, whereClause, whereClauseVal, qrycmt, (err, result) => {
                console.log(err);
                if (err) {
                    return callback(err, null);
                }
                // return callback(err, result);
                console.log("DP result=======", result)
                if (result.length > 0) {
                    console.log("DP result=======", result);
                    var hashedPassword = result[0]['password'];
                    var emstatus = result[0]['role_id'];
                    async.parallel({
                        hashPassword: (cb) => {
                            console.log("this.REQUEST.Password=====", this.REQUEST.Password);
                            bmgeneric.verifyPassword(this.REQUEST.Password, hashedPassword, (err, result) => {
                                if (err) {
                                    return cb(err)
                                }
                                return cb(null, result)
                            });
                        }
                    }, (err, results) => {
                        console.log("errr========", err);
                        if (err) {
                            return callback(err, null);
                        }
                        console.log(emstatus, "rs ===", results, "typeof======", typeof (results), "config.EMPSTATUS===========", config.EMPSTATUS);
                        let passcompare = results['hashPassword'];
                        if (passcompare == true) {
                            outputresponse.MSG = "successfully login";
                            outputresponse.EMPSTATUS = config.EMPSTATUS[emstatus];

                            outputresponse.is_staff = (emstatus == 1) 
                        } else {
                            outputresponse.MSG = "Invalid password";
                        }

                        return callback(null, outputresponse);
                    });
                } else {
                    outputresponse.MSG = "Please enter the valid Mail ID"
                    return callback(null, outputresponse);
                }
            })
        } catch (err) {
            return callback(err, null);
        }
    }


    userinfo(ID, calback) {
        try {
            var dbhost = { DBHOST: 'localhost' };
            var selectFields = "*";
            var whereClause = "id=?";
            var whereClauseVal = [ID];
            var qrycmt = "NBID Geting From MATRIIDINFO Table";
            bmDb.bmDbSelect(dbhost, DBNAME['HRM'], TABLE['USERS'], selectFields, whereClause, whereClauseVal, qrycmt, (err, result) => {
                console.log(err);
                if (err) {
                    return callback(err, null);
                }
                console.log("DP result=======", result)
                if (result.length > 0) {
                    return calback(null, result);
                } else {
                    return calback(null, { MGS: "Please enter the valid email" });
                }
            })
        } catch (err) {
            return calback(err, null);
        }
    }


    updateinfo(callback) {
        try {
            console.log("this.REQUEST=========", this.REQUEST);
            // return callback(null,null);
            var dbhost = { DBHOST: 'localhost' };
            var selectFields = "firstname";
            var whereClause = "id=?";
            // var whereClause = "PriMobileCountryCode=? and PriMobileNo=" + bmdbfunc.bmfuncEncryptValues('phone');
            var whereClauseVal = [this.REQUEST.ID];
            var qrycmt = "NBID Geting From MATRIIDINFO Table";
            bmDb.bmDbSelect(dbhost, DBNAME['MYDATABASE'], TABLE['FORM'], selectFields, whereClause, whereClauseVal, qrycmt, (err, result) => {
                console.log(err);
                if (err) {
                    return callback(err, null);
                }
                console.log("DP result=======", result)
                return callback(null, result);
            })
        } catch (err) {
            return callback(err, null);
        }
    }
}