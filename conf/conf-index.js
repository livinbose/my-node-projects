/**********************************************************************************************
 *	Filename	: conf-index.js							
 *	Author		: Livin bose 
 *	Date		: 07-02-2025			
 *	Description	: Global configuration variables 
***********************************************************************************************/
	// if no environment is set defaults to live
	process.env.NODE_ENV = !process.env.NODE_ENV ? 'production' : process.env.NODE_ENV;
    const path = require("path");

    const globalModulesPath = path.join(process.env.APPDATA, "npm", "node_modules");
    console.log("globalModulesPath=======", globalModulesPath);
    // const pm2 = require(require.resolve("pm2", { paths: [globalModulesPath] }));
    // const typescript = require(require.resolve("typescript", { paths: [globalModulesPath] }));
    // const express = require(require.resolve("express", { paths: [globalModulesPath] }));


    // const path = require("path");

    // const globalModulesPath = path.join(process.env.APPDATA, "npm", "node_modules");

    // List of required global packages
    const packages = ["pm2", "typescript", "express"];

    const loadedModules = {};

    try {
        packages.forEach((pkg) => {
            const modulePath = require.resolve(pkg, { paths: [globalModulesPath] });
            loadedModules[pkg] = require(modulePath);
        });

        express = loadedModules['express'];
        
        console.log("✅ Successfully loaded global packages:", Object.keys(loadedModules));
    } catch (error) {
        console.error("❌ Error loading global package:", error.message);
    }

    // console.log(pm2, typescript, express);
	/* Global Modules */
    fs				= require('fs');
    mysql 			= require('mysql'); //mysql@2.14.1
    async 			= require('async'); // async@2.3.0
    // crypto 			= require('crypto');
    // CRC32 			= require('crc-32'); //crc-32@1.1.1
    // request 		= require('request'); // request@2.82.0
    // axios           = require('axios');
    // express 		= require('express'); // express@4.15.2
    // strtotime 		= require('strtotime');//strtotime@1.0.0	
    dateFormat 		= require('dateformat'); // dateformat@3.0.2
    CryptoJS        = require("crypto-js");
    bcrypt          = require("bcrypt");
    vsprintf = require('sprintf').vsprintf;
    cors           = require("cors");
    cron = require('node-cron');
    // basicbauth 		= require('basic-auth'); // basic-auth@1.1.0
    // bodyParser 		= require('body-parser');//body-parser@1.17.1
    // vsprintf 		= require('sprintf').vsprintf; //sprintf@0.1.5
    // preventxss 		= require('node-xss').clean; 	
    // jwt 			= require('jsonwebtoken');
    nodemailer      =  require('nodemailer');// nodemailer@6.9.3
    // libphone = require('libphonenumber-js');
    Mailto          = require('./mailfunc');
    multer          = require('multer');

    // Schedule a cron job to run every minute
    cron.schedule('* * * * *', () => {
        // Mailto.mailSentFunction()
        console.log('🔔 Notification: This runs every minute!');
    });

    /**
     * 
     *  Global conf files required
     */
    NBinit          = require('./init.json');
    config          = require('./config.json');
    // bmvars          = require('./bmvars.json');
    // dbconfig 		= require('./nbconfig');
    // dbip 			= require('./dbConfig/dbip.' + NBinit.ENV + '.js');
    dbip 			= require('./dbConfig/dbip.' + NBinit.ENV + '.js');
    // solrConfig		= require('./dbConfig/solr.' + NBinit.ENV + '.js');
	dbinfo 		= require('./dbinfo');
    // SELECTOROBJ     = require('./nbselect.js');
    // JODIIFRIEBASE   = require('./firebasekey.json');
    
global.PHONE_KEY = "bTJXRnRqVEhBNWplTVFiYUJ2akw5MTBEOVV0OGdtbFpMYjdKNTRLZg==";
// actual string 'm2WFtjTHA5jeMQbaBvjL910D9Ut8gmlZLb7J54Kf'
global.EMAIL_KEY = "a2xKMThKZU9Id25mRDRaSWNtSDQ5dURvajlzNnl2N1E4QTJBWFJtUg==";
// actual string 'klJ18JeOHwnfD4ZIcmH49uDoj9s6yv7Q8A2AXRmR'
global.PASS_KEY = "OVpMbjMwMXl2NlVuaGlkOHpKUlVTdDFrRUFsbmZUUTl4U1cxd0YzSQ==";