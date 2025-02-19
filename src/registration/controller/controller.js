/************************************************************************************************
 *	Filename	: RegisterationController.js							
 *	Author		: Livin Bose
 *	Date		: 10-02-2025						
 *	Description	: HRM app Registeration module controller file.
/ ***********************************************************************************************/	
const reglib = require('./../models/registrationLibrary.js');
module.exports = (req, res, throwError) => {
    try{
        const reglibobj = new reglib(req,res);
        let resultant = {};
        console.log("req.url=========",req.url)
        let url = req.url.split('/')[1].split('?')[0];
        console.log('URL :',url);
        if(url === 'admininsertapi')
        {
            reglibobj.adminInsertfunc((err,result)=>{
                console.log("errr=======",err);
                // console.log("errr====result===",result);
                if(err){
                    res.json(err); 
                } else {
                    resultant =   {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': result
                    }
                    res.json(resultant);
                }               
            });
        } else if(url === 'adharverify'){
            reglibobj.getAadharId((err,result)=>{
                if(err){
                   return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'getcaptcha'){
            /**
             * Function get Captcha
             * POST URL : https://oapi.jodii.app/aadharapi/getcaptcha/v1
             * PARAM: {"ID":"123456","LANG":"en","APPTYPE":"300","ATN":"4567890","RTN":"4567890"}
             */
            reglibobj.getCaptchaAPI((err,result)=>{
                if(err){
                    resultant =   {
						'RESPONSECODE': 2,
						'ERRCODE': (err.errCode)?err.errCode:2,
						'MSG': (err.errMsg)?err.errMsg:err
					}
                } else {
                    resultant =   {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': result
                    }
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'getadharotp'){
            /**
             * Function Get OTP
             * Post URL : https://oapi.jodii.app/aadharapi/getadharotp/v1
             * PARAM : {"ID":"1001106","CAPTCHA":"rDTPr","AADHAR":"3333223","SSId":"wwwww","LANG":"en","APPTYPE":"300","ATN":"4567890","RTN":"4567890"}
             */
            reglibobj.getAdharOTP((err,result)=>{
                if(err){
					resultant =   {
						'RESPONSECODE': 2,
						'ERRCODE': (err.errCode)?err.errCode:2,
						'MSG': (err.errMsg)?err.errMsg:err
					}
                }else{
					resultant =   {
						'RESPONSECODE': '1',
						'ERRCODE': '0',
						'RESPONSE': result
					}
				}				
				//console.log(resultant);
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'getadharxml'){
            /**
             * Function get Aadhar Details
             * Post URL : https://oapi.jodii.app/aadharapi/getadharxml/v1
             * PARAM:{"ID":"1001106","OTP":"173502","SSId":"3434sdad","LANG":"en","APPTYPE":"300","ATN":"4567890","RTN":"4567890"}
             */
            reglibobj.getAdharXML((err,result)=>{
				console.log(err);
                if(err){
					resultant =   {
						'RESPONSECODE': 2,
						'ERRCODE': (err.errCode)?err.errCode:2,
						'MSG': (err.errMsg)?err.errMsg:err
					}
                }else{
					resultant =   {
						'RESPONSECODE': '1',
						'ERRCODE': '0',
						'RESPONSE': result
					}
				}
				//console.log(resultant);
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'aadhar'){
            reglibobj.setAadharUpd((err,result)=>{
                if(err){
                   return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });            
        }else if(url === 'zodiacinfo'){
            reglibobj.updateZodiacInfo((err,result)=>{
                if(err){
                   return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'familyinfo'){
            reglibobj.updatefamilyInfo((err,result)=>{
                if(err){
                   return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'gethorostateids'){
            reglibobj.gethorostateids((err,result)=>{
                if(err){
                    return throwError(err); 
                 }
                 resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            })
        }else if(url === 'gethorocityids'){
            reglibobj.gethorocityids((err,result)=>{
                if(err){
                    return throwError(err); 
                 }
                 resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            })
        }else if(url === 'generatehoroscope'  || url === 'updatehoroinfo'){
            reglibobj.generateHoroscope((err,result)=>{
                if(err){
                    return throwError(err); 
                 }
                 resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': 'Success'
                }
                req.NB.sendResponse(resultant);
            })        
        }else if(url === 'profreactive'){
            //https://stgmg.jodii.app/profreactive/123456?ID=123456&MOBILENO=8098351914
            reglibobj.profreactive((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'signzaccestokengen'){
            //https://stgmg.jodii.app/signzaccestokengen/123456?ID=123456&MOBILENO=8098351914
            reglibobj.signzaccestoken((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'signzgenerateotp'){
            //https://stgmg.jodii.app/signzgenerateotp/123456?ID=123456&MOBILENO=8098351914
            reglibobj.signzotp((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        } else if(url === 'signzotpverify'){
            //https://stgmg.jodii.app/signzotpverify/123456?ID=123456&MOBILENO=8098351914
            reglibobj.signzotpverification((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        } else if(url === 'signzcsotp'){
            //https://stgmg.jodii.app/signzcsotp/123456?ID=123456&MOBILENO=8098351914
            reglibobj.signzcsotp((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        }else if(url === 'signzcslistview'){
            //https://stgmg.jodii.app/signzcslistview/123456?ID=123456&MOBILENO=8098351914
            reglibobj.signzcsfailuremeber((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        } else if(url === 'signzycount'){
            //https://stgmg.jodii.app/signzycount/123456?ID=123456&MOBILENO=8098351914
            reglibobj.signzyusercount((err,result) => {
                if(err){
                    return throwError(err); 
                }
                resultant =   {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': result
                }
                req.NB.sendResponse(resultant);
            });
        } else if (url === 'successstory') {
            if(bmvars.SSFLAG==1){
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': {}
                }
                req.NB.sendResponse(resultant);
            }else{
                reglibobj.successStoryInfo((err, resultarr) => {
                    if (err) {
                        return throwError(err);
                    }
                    resultant = {
                        'RESPONSECODE': '1',
                        'ERRCODE': '0',
                        'RESPONSE': resultarr
                    }
                    req.NB.sendResponse(resultant);
                });
            }            
        } else if (url === 'checkotpupi') {
            reglibobj.checkOTPUPIAPI((err, resultarr) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': resultarr
                }
                req.NB.sendResponse(resultant);
            });
        } else if (url === 'insertAPI') {
            reglibobj.insertAPI((err, resultarr) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': resultarr
                }
                req.NB.sendResponse(resultant);
            });
        }
        else if (url === 'partialreg') {
            reglibobj.tempRegister(req, res,(err, resultarr) => {
                if (err) {
                    return throwError(err);
                }
                resultant = {
                    'RESPONSECODE': '1',
                    'ERRCODE': '0',
                    'RESPONSE': resultarr
                }
                req.NB.sendResponse(resultant);
            });
        }
    }catch(err){
        return throwError(err);
    }
}