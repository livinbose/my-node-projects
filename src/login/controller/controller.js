/************************************************************************************************
 *	Filename	: LoginController.js							
 *	Author		: Lalitha Raj
 *	Date		: 30-APRIL-2021								
 *	Description	: NB vernacular app Login module controller file.
/ ***********************************************************************************************/
const loginflow = require('./../models/loginflowlibrary');
module.exports = (req, res, throwError) => {
    try {
        // console.log("loginflowobj=========",loginflow);

        const loginflowobj = new loginflow(req, res);
        // console.log("loginflowobj=========",loginflowobj);
        let resultant = {};
        let url = req.url.split('/')[1].split('?')[0];
        console.log('URL :', url);
        if (url === 'loginemail') {
            console.log("Hiiiiiiiiiii")
            loginflowobj.loginCheck((err, result) => {
                // console.log("res=======", result);
                console.log("err=======", err);
                if (err) {
                    res.send(err);
                } else {
                    resultant = {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': result
                    }
                    // res.setHeader("Content-Type", "text/html");
                    res.json(resultant);
                }
            });
            // loginflowobj.loginvalidation((err,result)=>{
            //     if(err){
            //         err.MAXPHOTOADD = bmvars.MAXPHOTOADD;
            //         err.OTPLIMIT = bmvars.OTPLIMIT[err.MCODE];
            //         err.PROFILEDEACTIVATESTATUS = (!bmgeneric.empty(err.ACTIVESTATUS)) ? err.ACTIVESTATUS : 0;
            //        return throwError(err); 
            //     }
            //     result.MAXPHOTOADD = bmvars.MAXPHOTOADD;
            //     result.OTPLIMIT = bmvars.OTPLIMIT[result.MCODE];
            //     result.GLASSBOXENABLE = bmvars.GLASSBOXENABLE;
            //     resultant =   {
            //         'RESPONSECODE': '1',
            //         'ERRCODE': '0',
            //         'RESPONSE': result
            //     }
            //     req.NB.sendResponse(resultant);
            // });
        }
        else if (url === 'updateapi') {
            loginflowobj.userdetailsupd((err, result) => {
                if (err) {
                    res.json(err);
                } else {
                    resultant = {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': result
                    }
                    res.json(resultant);
                }
            });
        }
        else if (url === 'verifyotp') {
            loginflowobj.verifyloginOTP((err, result) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }
        else if (url === 'resendotp') {
            loginflowobj.resendloginOTP((err, result) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }
        else if (url === 'autologin') {
            loginflowobj.autologinMember((err, result) => {
                if (err) {
                    err.PROFILEDEACTIVATESTATUS = (!bmgeneric.empty(err.ACTIVESTATUS)) ? err.ACTIVESTATUS : 0;
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                res.json(resultant);
            });
        } else if (url === 'forgot-password') {
            loginflowobj.forgotpass((err, result) => {
                console.log("errr==============",err);
                if (err) {
                    res.send(err); //return throwError(err);
                } else {
                    resultant = {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': { 'MSG': result }
                    }
                    res.json(resultant);
                }
            });
        } else if (url === 'deleteprofile') {
            loginflowobj.deleteprofile((err, result) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': { 'MSG': result }
                }
                req.NB.sendResponse(resultant);
            });
        } else if (url === 'switchlanguage') {
            loginflowobj.switchlanguage((err, result) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': { 'MSG': 'Success' }
                }
                req.NB.sendResponse(resultant);
            });
        } else if (url === 'imageupload') {
            loginflowobj.imageUpload((err, response) => {
                if (err) {
                    // return throwError(err)
                    res.json(err);
                } else {
                    resultant = {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': response
                    }
                    res.json(resultant);
                }
            })
        } else if (url === 'video') {
            loginflowobj.videostream((err, response) => {
                if (err) {
                    res.json(err);
                }
                res.json(response);
            })
        } else if (url === 'paywallupd') {
            loginflowobj.paywallupd((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            })
        } else if (url === 'paywallduration') {
            loginflowobj.paywallduration((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            })
        } else if (url === 'paywallprofileupdate') {
            loginflowobj.paywallIDProofDataUpdate((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            })
        } else if (url === 'reporteblock') {
            loginflowobj.reporteduser((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            })
        } else if (url === 'nodemail') {
            loginflowobj.nodemailsent((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            })
        } else if (url === 'limitrelaxations') { // fulimitrelaxations
            loginflowobj.limitcheck((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            })
        } else if (url === 'logintruecall') {
            // for JODII-8 true caller 
            loginflowobj.loginCheck((err, result) => {
                if (err) {
                    err.MAXPHOTOADD = bmvars.MAXPHOTOADD;
                    // err.OTPLIMIT = bmvars.OTPLIMIT[err.MCODE];
                    err.OTPLIMIT = 0;
                    err.PROFILEDEACTIVATESTATUS = (!bmgeneric.empty(err.ACTIVESTATUS)) ? err.ACTIVESTATUS : 0;
                    return throwError(err);
                }
                result.MAXPHOTOADD = bmvars.MAXPHOTOADD;
                // result.OTPLIMIT = bmvars.OTPLIMIT[result.MCODE];
                result.OTPLIMIT = 0;
                result.GLASSBOXENABLE = bmvars.GLASSBOXENABLE;
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        } else if (url === 'dbtrack') {
            loginflowobj.databasetrack((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            });
        } else if (url === 'supinterapi') {
            loginflowobj.supportinterfaceAPI((err, response) => {
                if (err) {
                    return throwError(err)
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': response
                }
                req.NB.sendResponse(resultant);
            });
        }
    } catch (err) {
        return throwError(err);
    }
}        
