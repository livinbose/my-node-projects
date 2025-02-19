/**********************************************************************************************
 *	Filename	: src/index.js							
 *	Author		: Livin Bose S
 *	Date		: 06-02-2025					
 *	Description	: Graphql Main router file. 
***********************************************************************************************/
const express = require('express');
const router = express.Router();
/**
 * This block includes all the controller classes
 * POST, GET, PUT, PATCH & DELETE
 */
const loginControl = require('./controller/controller'); 

router.post('/admininsertapi',loginControl);
router.get('/admininsertapi',loginControl);

router.post('/updateapi/:ID',loginControl)
router.get('/updateapi/:ID',loginControl)
console.log("Welcome");

module.exports = router;
