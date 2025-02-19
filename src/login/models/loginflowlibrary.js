/**********************************************************************************************
File    : loginflowlibrary.js
Author  : Livin Bose 
Date    : 07-02-2025
************************************************************************************************/
const { callbackPromise } = require('nodemailer/lib/shared');
const loginDBFunctions = require('./loginDBFunctions');
module.exports = class loginflowlibrary extends loginDBFunctions {
    constructor(req, res) {
        super();
        this.req = req;
        this.res = res;
        this.REQUEST = {};
        this.REQUEST = Object.create(Object.assign(this.req.body, this.req.query));
        this.REQUEST = bmgeneric.sanitize(this.REQUEST);
        // this.REQUEST = preventxss(this.REQUEST);
        this.REQUEST.APIROUTER = this.req.url.split('/')[1];
        if (this.REQUEST.APIROUTER == 'imageupload') {
            this.REQUEST.FILE = (this.req.file) ? this.req.file : '';
        }
        // this.select = SELECTOROBJ.LOGIN; livinbose5@gmail.com LivinBose@1997
    }

    loginCheck(callback) {
        try {
            console.log("this.REQ======", this.REQUEST);
            let Email = this.REQUEST.Email
            if (!bmgeneric.empty(Email) && Email != "") {

                // const transporter = nodemailer.createTransport({
                //     service: 'gmail',
                //     auth: {
                //         user: 'livinbose5@gmail.com', // Your email
                //         pass: 'dchl viey uldz lfcz' // App password
                //     }
                // });
                // let OTP = '1234';
                // // Send OTP via Email
                // const mailOptions = {
                //     from: 'livinbose5@gmail.com',
                //     to: 'livinbose0@gmail.com',
                //     subject: 'Password Reset OTP',
                //     text: `Your OTP for password reset is: ${OTP}. It expires in 10 minutes.`
                // };

                // transporter.sendMail(mailOptions, (error, info) => {

                //     if (error) {
                //         console.log("Errrr",error);
                //     }
                //     console.log("INFO===",info)
                //     // if (error) return res.status(500).json({ error }
                //     // if );
                //     // res.json({ message: 'OTP sent successfully' });
                // });

                this.DBcheck(Email, (err, result) => {

                    //         const users = [
                    //             {
                    //                 name: "John Doe",
                    //                 userid: "U1001",
                    //                 email: "john.doe@example.com",
                    //                 password: "password123",
                    //                 dateofjoin: "2023-05-10",
                    //             },
                    //             {
                    //                 name: "Jane Smith",
                    //                 userid: "U1002",
                    //                 email: "jane.smith@example.com",
                    //                 password: "securepass",
                    //                 dateofjoin: "2022-08-15",
                    //             },
                    //             {
                    //                 name: "Robert Johnson",
                    //                 userid: "U1003",
                    //                 email: "robert.j@example.com",
                    //                 password: "robert@123",
                    //                 dateofjoin: "2021-11-20",
                    //             },
                    //             {
                    //                 name: "Emily Brown",
                    //                 userid: "U1004",
                    //                 email: "emily.b@example.com",
                    //                 password: "emilyPass",
                    //                 dateofjoin: "2020-06-30",
                    //             },
                    //             {
                    //                 name: "Michael Scott",
                    //                 userid: "U1005",
                    //                 email: "michael.scott@dundermifflin.com",
                    //                 password: "bestBoss",
                    //                 dateofjoin: "2019-09-12",
                    //             },
                    //         ];
                    //         let table = `<table border="1" cellspacing="0" cellpadding="10">
                    //      <tr>
                    //        <th>Name</th>
                    //        <th>User ID</th>
                    //        <th>Email</th>
                    //        <th>Password</th>
                    //        <th>Date of Join</th>
                    //      </tr>`;

                    //         users.forEach((user) => {
                    //             table += `<tr>
                    //     <td>${user.name}</td>
                    //     <td>${user.userid}</td>
                    //     <td>${user.email}</td>
                    //     <td>${user.password}</td>
                    //     <td>${user.dateofjoin}</td>
                    //   </tr>`;
                    //         });

                    //         table += `</table>`;

                    // console.log(table,"====", result);
                    console.log("====", result);
                    if (err) {
                        return callback(err, null);
                    }
                    return callback(null, result);
                });
            } else {
                let errMsg = {};
                errMsg.MSG = "Please enter the Email"
                return callback(errMsg, null);
            }
        } catch (err) {
            return callback(err, null);
        }
    }

    userdetailsupd(callback) {
        try {
            this.updateinfo((err, result) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, result);
            });
        } catch (err) {
            return callback(err, null);
        }
    }

    forgotpass(callback) {
        try {
            let ID = this.REQUEST.ID;
            console.log(this.REQUEST);
            let userdetailsotp = {};
            async.series({
                userinfofetch: (cb) => {
                    this.userinfo(ID, (err, result) => {
                        if (err) {
                            return cb(err, null);
                        }
                        console.log("res=====", result);
                        userdetails = result;
                        return cb(null, result);
                    })
                },
                forgottableselect: (cb) => {
                    this.tableselect((err, result) => {
                        if (err) {
                            return cb(err, null);
                        }
                        userdetailsotp = result;
                        return cb(null, result);
                    })
                },
                forgottableinsert: (cb) => {
                    if (bmgeneric.empty(userdetailsotp)) {
                        console.log("userdetails======", userdetails);
                        return cb(null, null);
                    } else {
                        console.log("ID is empty");
                        return cb(null, { MSG: "Please enter the valid id" });
                    }
                }

            }, (err, result) => {
                if (err) {
                    return callback(err)
                }
                return callback(null, result);

            });
            console.log("forgot password");

        } catch (err) {
            return callback(err, null);
        }
    }


    imageUpload(calbk) {
        try {
            // console.log("THis.REQ========",this.REQUEST);        
        
            const userId = this.REQUEST.ID; // Get user ID from URL
            const imagePath = this.REQUEST.FILE ? `/uploads/${this.REQUEST.FILE.filename}` : null; // Get uploaded file path
            if (!imagePath) {
                return calbk({ error: "No file uploaded" }); //res.status(400).json({ error: "No file uploaded" });
            }

            // Here, you can save `imagePath` in the database with `userId`
            console.log(`User ID: ${userId}, Uploaded Image: ${imagePath}`);

            // res.json({ message: "Image uploaded successfully!", imagePath });
            return calbk(null, { message: "Image uploaded successfully!", imagePath })
        } catch (err) {
            return calbk(err);
        }
    }

    videostream(clb) {
        try {
            return clb(null,null);
        } catch(e) {
            return (e,null);
        }
    }
}









// module.exports = class loginDBFunctions {
//     DBcheck(email, callback) {
//         console.log("email========", email);
//         try {//dbHost, dbName, tableName, selectFields, whereClause, whereValueArr
//             let outputresponse = {}
//             var dbhost = { DBHOST: 'localhost' };
//             var selectFields = "*";
//             // var whereClause = "PriMobileNo=" + bmdbfunc.bmfuncEncryptValues('phone');
//             // var whereClause = "PriMobileCountryCode=? and PriMobileNo=" + bmdbfunc.bmfuncEncryptValues('phone');
//             var whereClause = {};//"{}";
//             var whereClauseVal = [];
//             var qrycmt = "NBID Geting From MATRIIDINFO Table";
//             bmDb.bmDbSelect(dbhost, DBNAME['HRM'], TABLE['USERS'], selectFields, whereClause, whereClauseVal, qrycmt, (err, result) => {
//                 console.log(err);
//                 if (err) {
//                     return callback(err, null);
//                 }
//                 return callback(err, result);
//                 console.log("DP result=======", result)
//                 if (result.length > 0) {
//                     console.log("DP result=======", result);
//                     var hashedPassword = result[0]['password'];
//                     var emstatus = result[0]['empstatus'];
//                     async.parallel({
//                         hashPassword: (cb) => {
//                             console.log("this.REQUEST.Password=====",this.REQUEST.Password);
//                             bmgeneric.verifyPassword(this.REQUEST.Password, hashedPassword, (err, result) => {
//                                 if (err) {
//                                     return cb(err)
//                                 }
//                                 return cb(null, result)
//                             });
//                         }
//                     }, (err, results) => {
//                         console.log("errr========", err);
//                         if (err) {
//                             return callback(err, null);
//                         }
//                         console.log(emstatus, "rs ===", results, "typeof======", typeof (results), "config.EMPSTATUS===========", config.EMPSTATUS);
//                         let passcompare = results['hashPassword'];
//                         if (passcompare == true) {
//                             outputresponse.MSG = "successfully login";
//                             outputresponse.EMPSTATUS = config.EMPSTATUS[emstatus];
//                         } else {
//                             outputresponse.MSG = "Invalid password";
//                         }

//                         return callback(null, outputresponse);
//                     });
//                 } else {
//                     outputresponse.MSG = "Please enter the valid Mail ID"
//                     return callback(null, outputresponse);
//                 }
//             })
//         } catch (err) {
//             return callback(err, null);
//         }
//     }


//     userinfo(ID,calback) {
//         try {
//             var dbhost = { DBHOST: 'localhost' };
//             var selectFields = "*";
//             var whereClause = "id=?";
//             var whereClauseVal = [ID];
//             var qrycmt = "NBID Geting From MATRIIDINFO Table";
//             bmDb.bmDbSelect(dbhost, DBNAME['HRM'], TABLE['USERS'], selectFields, whereClause, whereClauseVal, qrycmt, (err, result) => {
//                 console.log(err);
//                 if (err) {
//                     return callback(err, null);
//                 }
//                 console.log("DP result=======", result)
//                 if (result.length > 0) {
//                     return calback(null,result);
//                 } else {
//                     return calback(null,{MGS : "Please enter the valid email"});
//                 }
//             })
//         } catch (err) {
//             return calback(err, null);
//         }
//     }


//     updateinfo(callback) {
//         try {
//             console.log("this.REQUEST=========", this.REQUEST);
//             // return callback(null,null);
//             var dbhost = { DBHOST: 'localhost' };
//             var selectFields = "firstname";
//             var whereClause = "id=?";
//             // var whereClause = "PriMobileCountryCode=? and PriMobileNo=" + bmdbfunc.bmfuncEncryptValues('phone');
//             var whereClauseVal = [this.REQUEST.ID];
//             var qrycmt = "NBID Geting From MATRIIDINFO Table";
//             bmDb.bmDbSelect(dbhost, DBNAME['MYDATABASE'], TABLE['FORM'], selectFields, whereClause, whereClauseVal, qrycmt, (err, result) => {
//                 console.log(err);
//                 if (err) {
//                     return callback(err, null);
//                 }
//                 console.log("DP result=======", result)
//                 return callback(null, result);
//             })
//         } catch (err) {
//             return callback(err, null);
//         }
//     }
// }