/**********************************************************************************************
 *	Filename	: src/index.js							
 *	Author		: Livin Bose
 *	Date		: 06-02-2025						
 *	Description	: Graphql Main router file. 
***********************************************************************************************/
const express = require('express');   
const router = express.Router();    

/**
 * 
 * default root api visible to everyone
*/
router.all('/', (req, res) => {        
    res.json({
        "RESPONSECODE": "1",
        "ERRCODE": "0",
        "TITLE": 'Welcome to Livin node Server',
        "MESSAGE": 'This is an Livin Server'
    });
});

//To serve dashboard ui files
router.get('', function(req, res) {
    res.json({
        "RESPONSECODE": "1",
        "ERRCODE": "0",
        "TITLE": 'Welcome to NBApp Server',
        "MESSAGE": 'This is an NBApp Server Server '
    });
   // res.sendFile(path.join(__dirname, '/public/index.html'));
});

/**
 * 
 * Login root api visible to everyone
// */
const NBLoginRouter = require('./login');
router.use('/login', (req, res, next) => {
    console.log("NBLoginRouter=========");
    next();
}, NBLoginRouter);

// /**
//  * Registration Router
//  */
const NBRegRouter = require('./registration');
router.use('/registration', (req, res, next) => {
    console.log("registration=========");
    next();
}, NBRegRouter);

// const NBVSPRouter = require('./viewsimilar');
// router.use('/viewsimilar',(req, res, next) => {
//     console.log('viewsimilar========');
//     next();
// },NBVSPRouter);

// const NBRatingRouter = require('./appsrating');
// router.use('/apprating',(req, res, next) => {
//     console.log('apprating========');
//     next();
// },NBRatingRouter);

// /**
//  * Payment Router
//  */
// const NBPayRouter = require('./payment');
// router.use('/payment', (req, res, next) => {
//     console.log("payment=========");
//     next();
// }, NBPayRouter);

// /**
// * Lisiting Router
// */
// const NBListingRouter = require('./listing');
// router.use('/listing', (req, res, next) => {
//     console.log("listing=========");
//     next();
// }, NBListingRouter);

// /**
// * Lisiting Router
// */
// //const NBListingRouter = require('./listing');
// router.use('/search', (req, res, next) => {
//     console.log("search=========");
//     next();
// }, NBListingRouter);

// /**
//  * Communication Profile Router
//  */
// const CommunicationRouter = require('./communication/Router');
// router.use('/communication', (req, res, next) => {
// 	console.log("control came in communication router");
//     next();
// }, CommunicationRouter);

// /**
//  * Notification Router
//  */
// const NotificationRouter = require('./notification');
// router.use('/notify', (req, res, next) => {
// 	console.log("control came in communication router");
//     next();
// }, NotificationRouter);

// /**
//  * ViewProfile Router
//  */
// const NBviewprofileRouter = require('./viewprofile');
// router.use('/viewprofile', (req, res, next) => {
//     console.log("viewprofile=========");
//     next();
// }, NBviewprofileRouter);

// router.use('/biodata', (req, res, next) => {
//     console.log("biodata=========");
//     next();
// }, NBviewprofileRouter);

// /**
//  * editProfile Router
//  */
// const NBeditprofileRouter = require('./editProfile');
// router.use('/editprofile', (req, res, next) => {
//     console.log("editprofile=========");
//     next();
// }, NBeditprofileRouter);

// /**
//  * 
//  * B2B Interface api Router
// */
// const NBB2BRouter = require('./b2binterface');
// router.use('/b2b', (req, res, next) => {
//     console.log("b2b=========");
//     next();
// }, NBB2BRouter);

// /**
//  * 
//  * B2B Interface api Router
// */
// const SRouter = require('./survey');
// router.use('/survey', (req, res, next) => {
//     console.log("b2b=========");
//     next();
// }, SRouter);

// /**
//  * 
//  * B2B Interface api Router
// */
// const faqRouter = require('./faq');
// router.use('/faq', (req, res, next) => {
//     console.log("FAQ=========");
//     next();
// }, faqRouter);


// const NBdata  = require('./bmtonbdata');
// router.get('/datacheck/:ID',NBdata);
// const NBsolt  = require('./bmtonbdata/solrTest.js');
// router.get('/solrTest',NBsolt);

module.exports = router;
