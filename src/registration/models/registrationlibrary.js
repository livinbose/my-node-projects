/**********************************************************************************************
File    : loginflowlibrary.js
Author  : Livin Bose 
Date    : 07-02-2025
************************************************************************************************/
const registrationDBfunction = require('./registrationDBfunction');


module.exports = class registrationlibrary extends registrationDBfunction {
    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
        this.REQUEST = {};
        this.REQUEST = Object.create(Object.assign(this.req.body, this.req.query));
        this.REQUEST = bmgeneric.sanitize(this.REQUEST);
        this.REQUEST.APIROUTER = this.req.url.split('/')[1];
    }

    adminInsertfunc(callback) {
        try {
            console.log("Welocme")
            // exports.decryptEmail = decryptEmail;
            //   let encrypt = bmgeneric.encryptEmail(this.REQUEST.Email);
            //   let decrypt = bmgeneric.decryptEmail(encrypt);
            //   let hashPassword = bmgeneric.hashPassword(this.REQUEST.Password,(err,result) => {
            //     console.log("err=======",err);
            //     console.log("result=======",result);
            //   });
            console.log("this.REQ=====", this.REQUEST);
            let Email = this.REQUEST.Email;
            if (!bmgeneric.empty(Email)) {
                let encryptm
                async.series({
                    enCrptMail: (cb) => {
                        let encrypt = bmgeneric.encryptEmail(this.REQUEST.Email);
                        encryptm = encrypt;
                        return cb(null, encrypt);
                    },
                    deCrptMail: (cb) => {
                        let decrypt = bmgeneric.decryptEmail(encryptm);
                        return cb(null, decrypt);

                    },
                    hashPassword: (cb) => {
                        bmgeneric.hashPassword(this.REQUEST.Password, (err, result) => {
                            if (err) {
                                return cb(err)
                            }
                            return cb(null, result)
                        });
                    }

                }, (err, results) => {
                    if (err) {
                        return callback(err, null);
                    }
                    console.log("err======", results);
                    let encryptmail = this.REQUEST.Email;
                    let hashPassword = results['hashPassword'];
                    var dformat = dateFormat(new Date(), 'yyyy-mm-dd"T"HH:MM:ss"Z"');
                    let insertsql = {};
                    insertsql.first_name = this.REQUEST.Name;
                    insertsql.last_name = this.REQUEST.LastName;
                    insertsql.email = encryptmail;
                    insertsql.password = hashPassword;
                    insertsql.phone = this.REQUEST.Phone;
                    insertsql.role_id = this.REQUEST.RoleId
                    // insertsql.email_verified_at = dformat;
                    insertsql.created_at = dformat;
                    insertsql.updated_at = dformat;
                    console.log('insertsql===============', insertsql);
                    // return callback(null, null);
                    this.insertDBdate(insertsql, (err, result) => {
                        if (err) {
                            return callback(err, null);
                        }
                        return callback(null, results);

                    });
                });
            } else {
                return callback(null, { MSG: "Please enter the value" });
            }

        } catch (err) {
            return callback(err, null);
        }
    }
}