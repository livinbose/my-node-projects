/**********************************************************************************************
 *	Filename	: app.js							
 *	Author		: Livin Bose S
 *	Date		: 06-02-2025							
 *	Description	: crm APp
 *  Versions    : Node - v14.11.0 & NPM  - 6.5.0
***********************************************************************************************/
// global app utility
require('./conf/conf-index');
require('./lib/lib-index');
var bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
strtotime = require('strtotime');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// registering global middleware
// require('./middleware/index')(express, app);   
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());//{ origin: "http://localhost:3000", credentials: true }

 // setting access headers, allowing request coming from any client
  app.use((req, res, next) => {
    console.log('\x1b[33m%s\x1b[0m', 'Request came in : ' + req.url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.start = new Date();
    next();
});
console.log("path.join(__dirname, uploads)",path.join(__dirname, "/uploads/"));

// app.use("uploads", express.static(path.join(__dirname, "/uploads/"))); // Serve images


// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// console.log("========================================")
// app.use((req, res, next) => {
//     console.log('\x1b[33m%s\x1b[0m', 'Request came in : ' + req.url);

//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next()
// });


  

// setting up the app routes
// const Vernacular = require('./lib/Vernacular');    
const route = require('./src/router');
app.use('/', (req, res, next) => {
    // req.nbLang = new Vernacular(req, res);   
    // req.nbLang.setLanguage(req.body.LANG || req.query.LANG || "en");
    next();
}, route);

// console.log("NBinit========",NBinit);

// Enable CORS for all routes
app.use(express.json());



// Allow specific methods & headers (optional)
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     res.header("Access-Control-Allow-Credentials", "true");
  
//     if (req.method === "OPTIONS") {
//       return res.sendStatus(200);
//     }
//     next();
//   });

 
/**
 * 404 error handler or
 * put some condition to do post-middleware activity
 */
app.use((req, res, next) => {
    // req.NB.sendResponse({
    //     'RESPONSECODE': '2',
    //     'ERRCODE': '12',
    //     'RESPONSE': req.NB.getError('VIEWPROFILE', 12)
    // }, 404);
    next();
});

/**
 * error handler
 * Internal server error
 */
app.use((err, req, res, next) => {
    console.log("err====", err);
    // console.log("REQ+=========",req);
    // console.log("REQ+=========",req.NB);
    let genError;
    if (err.errCode) {
        if (err.error.stack) {
            genError = err.error.stack;
        } else {
            genError = err.error;
        }
    } else if (err.stack) {
        genError = err.stack;
    } else {
        genError = err;
    }
    // {"METHOD ->":"GET","URL ->":"/login/loginotp","BODY ->":{},"TIME_SERVED ->":"NaN MS","REFERRER ->":null,"USERAGENT ->":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0","IP ->":"::1","IPS ->":[],"WARN ->":null,"INFO ->":null,"LOG ->":null,"ERROR ->":null,"TRACE ->":"No trace detected","ACTUAL_ERROR ->":"TypeError: loginflow is not a constructor\n    at module.exports (D:\\learn node js\\node setup\\src\\login\\controller\\controller.js:10:30)\n    at Layer.handle [as handle_request] (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at next (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\route.js:149:13)\n    at Route.dispatch (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\route.js:119:3)\n    at Layer.handle [as handle_request] (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\layer.js:95:5)\n    at D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\index.js:284:15\n    at Function.process_params (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\index.js:346:12)\n    at next (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\index.js:280:10)\n    at Function.handle (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\index.js:175:3)\n    at router (D:\\learn node js\\node setup\\node_modules\\express\\lib\\router\\index.js:47:12)"}
    const MXErr = JSON.stringify({
        'METHOD ->': req.method,
        'URL ->': req.url,
        'BODY ->': req.body || null,
        // 'IN_TIME ->': req.start.toLocaleString() + " " + req.start.getMilliseconds(),
        // 'OUT_TIME ->': new Date().toLocaleString() + " " + new Date().getMilliseconds(),
        'TIME_SERVED ->': new Date() - req.start + " MS",
        'REFERRER ->': req.headers.referer || null,
        'USERAGENT ->': req.headers['user-agent'] || null,
        'IP ->': req.ip || null,
        'IPS ->': req.header('x-forwarded-for') || req.ips || null,
        'WARN ->': req.WARN || null,
        'INFO ->': req.INFO || null,
        'LOG ->': req.LOG || null,
        'ERROR ->': req.ERROR || null,
        'TRACE ->': err.trace || "No trace detected",
        'ACTUAL_ERROR ->': genError
    });
    console.error('\x1b[31m%s\x1b[0m', MXErr);

    let errCode = err.errCode || 1;
    let errMsg = err.errMsg || genError || req.NB.getError('Matrix', 1);
    errMsg = (typeof errMsg == 'string') ? { "MSG": errMsg } : errMsg;
    let code = 200;
    if (errCode === 1) {
        code = 200; // 500
    }
    // req.NB.sendResponse({
    //     'RESPONSECODE': '2',
    //     'ERRCODE': errCode.toString(),
    //     'ERRMSG': (errMsg.ERRMSG) ? errMsg.ERRMSG : "",
    //     'RESPONSE': errMsg
    // }, code, genError);

    next();
});



module.exports = app;