/**********************************************************************************************
File    : bmdbinfo.js
Author  : Livin bose
Date    : 06-02-2025
************************************************************************************************
Description: This inc file have mysql class and functions.
***********************************************************************************************/
	
// Database Name //
global.DBNAME = {};
DBNAME['MYDATABASE'] = 'mydb';
DBNAME['HRM'] = 'hrm';
DBNAME['ELEARNING'] = 'eaglearning';

// Database Username & Password //
//global.DBINFO = {};DBNAME['HRM'], TABLE['USERS'],
//DBINFO['USERNAME'] = 'majdsrcndusr';  
//DBINFO['PASSWORD'] = 'png8mzjz';

global.DBINFO = {};

DBINFO['DEVNBPRODB1'] = { 'USERNAME': 'root', 'PASSWORD': "", 'PORT': 5000 };
DBINFO['DEVNBPRODB2'] = { 'USERNAME': 'usr4jdproclu', 'PASSWORD': '3Cw#twV9', 'PORT': 6477 };

// Single Table //
global.TABLE = {};
//Table for NB app login Info.
TABLE['FORM']='myform';
TABLE['USERS'] = 'users';
TABLE['EUSERS'] = 'users';
// TABLE['NBIDPROOF']='nbidproof';


// PORT=5000
// DB_HOST=localhost
// DB_USER=root
// DB_PASS=''
// DB=mydb
