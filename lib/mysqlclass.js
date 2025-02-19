/**********************************************************************************************
File    : bmdbinfo.js
Author  : Livin bose
Date    : 06-02-2025
************************************************************************************************
Description: This inc file have mysql class and functions.
***********************************************************************************************/
/**
 * 
 *  Global lib files required
 */

/* Libbm & Generic files included */
// bmgeneric 		= require('./bmfuncgeneric.js');
// bmdbfunc 		= require('./bmdbfunction.js');
// bmDb 			= require('./');


// const mysql = require("mysql");
// const config = require("./config");

// global.MysqlSlave = {};

// MysqlSlave[mysqlkey]  = mysql.createPool({
//     connectionLimit : dbconfig.poolLimit,
//     host            : mysqlip,
//     user            : DBINFO[mysqlkey]['USERNAME'],
//     password        : DBINFO[mysqlkey]['PASSWORD'],
//     port 			: DBINFO[mysqlkey]['PORT'],
//     dateStrings		: true
// });
// PORT=5000
// DB_HOST=localhost
// DB_USER=root
// DB_PASS=''
// DB=mydb
console.log(NBinit.ENV)
console.log("DBNAME=======", DBNAME);
console.log("DBINFO========", DBINFO);
console.log("dbip==========", DBSLAVEIP);

// DBNAME======= { MYDATABASE: 'mydb' }
// DBINFO======== { DEVNBPRODB1: { USERNAME: 'root', PASSWORD: '', PORT: 5000 } }


global.sqlPatternArr = ["UNION ALL","INTO OUTFILE","LOAD_FILE","INFORMATION_SCHEMA","SHOW TABLES","SHOW DATABASES","SLEEP(","EXTRACTVALUE","UNION SELECT","PG_SLEEP","WAITFOR","table_schema","CHAR(","@@VERSION","-999.9","-9.9","x=x","x=y","WAITFOR DELAY","hex(","(1=1","1=1","||","EXISTS"];

const config = {
    host: DBSLAVEIP.DB1_SLAVE,
    user: DBINFO["DEVNBPRODB1"]["USERNAME"],
    password: DBINFO["DEVNBPRODB1"]["PASSWORD"],
    // database: process.env.DB,
    dateStrings: true
};

const pool = mysql.createPool(config);

pool.getConnection((err, connection) => {
    if (err) {
        console.log({ errorObject: err.message });
    }
    console.log("Connected to MySQL database");
    connection.release();
});

// // Handle errors after the initial connection
pool.on('error', (err) => {
    console.error('Database error:', err.message);

    // Handle connection lost error
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error('Connection lost. Reconnecting...');
        connection.connect();
    }
    else {
        throw err;
    }
});


//Mysql Select Query Function	
exports.bmDbSelect = function(dbHost, dbName, tableName, selectFields, whereClause, whereValueArr, qrycmt,next){
    // if (tableName.match(/notesinfo.*/)) {
    //     tableName = "notesinfo";
    // }
    var start = bmgeneric.UnixTimeStamp();
    var wherecl = bmgeneric.ucwords(whereClause);
    if(wherecl.indexOf("HAVING") > 0){
        var execQuery  = "SELECT "+selectFields+ " FROM "+dbName+"."+tableName+" "+whereClause;
    } else if(bmgeneric.empty(whereValueArr)){
        var execQuery  = "SELECT "+selectFields+ " FROM "+dbName+"."+tableName;
    } else {
        var execQuery  = "SELECT "+selectFields+ " FROM "+dbName+"."+tableName+" WHERE "+whereClause;
    }		
    var Query  = execQuery + whereValueArr;	
    console.log("execQuery==========",execQuery);		
    if(selectFields != '' && tableName != '' && dbName !=''){	
        var ErrTxt = "SELECT";
        var dbHost = dbHost.DBHOST || dbHost.host;
        var writeTxtFile = "";
        writeTxtFile += "\nInside "+ErrTxt+" Qry "+bmgeneric.getDate("HH:MM:ss");
        if(typeof(pool) == "object"){				
            pool.getConnection(function (err,SLAVECONN) {					
                if (err) {					
                    console.log("DB_SELECT_CONNECTION_ERR:",err);
                    var viewprofileOutput = {};							
                    viewprofileOutput['responsecode'] = 1;
                    viewprofileOutput['errcode'] = 2;
                    viewprofileOutput['ErrorResponse'] = err;
                    viewprofileOutput['Error'] = "DB_UNABLE_TO_PING_ERR_IN_SELECT_QRY_ERR";
                    viewprofileOutput['PARAMETER'] = execQuery;
                    next(viewprofileOutput, viewprofileOutput);
                    writeTxtFile += "; \nExecQry : "+whereValueArr;
                    writeTxtFile += "; \nQry : "+Query;
                    writeTxtFile += "; \nDb Host : "+global.MysqlSlave[dbHost];
                    writeTxtFile += "; \nDB_UNABLE_TO_PING_ERR_IN_SELECT_QRY_ERR: "+err;
                    writeTxtFile += "\n=====================================================";
                    bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE-ERR",writeTxtFile,1,function(err,wrcallback){});
                    return;
                } 	
                console.log(whereValueArr,"Select===========",execQuery,'whereValueArr:',whereValueArr);
                 SLAVECONN.query(execQuery,whereValueArr, function(err, rows) {
                    // And done with the connection.
                    SLAVECONN.release();
                    if (err) {
                        console.log("SLAVE_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR:",err.code);
                        writeTxtFile += "; \nExecQry : "+execQuery;
                        writeTxtFile += "; \nQry : "+Query;
                        writeTxtFile += "; \nDb Host : "+ SLAVECONN.config.host;
                        writeTxtFile += "; \nDb SLAVE_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR: "+err;
                        writeTxtFile += "\n=====================================================";
                        bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE-ERR",writeTxtFile,1,function(err,wrcallback){});
                        var viewprofileOutput = {};							
                        viewprofileOutput['responsecode'] = 2;
                        viewprofileOutput['errcode'] = 1;
                        viewprofileOutput['Error'] = "SLAVE_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR";
                        viewprofileOutput['PARAMETER'] = Query;
                        return next(err, viewprofileOutput);
                    } 
                    //console.log("MysqlPool select=======",rows);
                    var end = bmgeneric.UnixTimeStamp();
                    console.log("BM "+ErrTxt+" Query Time :" + (end-start) + " Seconds");
                    next(null, rows);
                    /****For SELECT query log delay ****/
                    if(end - start > 6)	{
                        writeTxtFile += "; After Execute "+bmgeneric.getDate("HH:MM:ss");
                        writeTxtFile += "; \nExecQry : "+execQuery;
                        writeTxtFile += "; \nQry : "+Query;
                        writeTxtFile += "; \nDb Host : "+ SLAVECONN.config.host;
                        writeTxtFile += "\n=====================================================";
                    console.log("writeTxtFile=====",writeTxtFile);

                        bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE",writeTxtFile,1,function(err,wrcallback){});
                    }
                });					
            });
        } else {			
            var viewprofileOutput = {};							
            viewprofileOutput['responsecode'] = 0;
            viewprofileOutput['errcode'] = 1;
            viewprofileOutput['Error'] = 'Invalid DB Host '+ dbHost;
            viewprofileOutput['PARAMETER'] = execQuery;
            next(viewprofileOutput, {});	
            writeTxtFile += "; \nExecQry : "+execQuery;
            writeTxtFile += "; \nQry : "+Query;		
            writeTxtFile += "; \nDb Host : undefined";
            writeTxtFile += "\n=====================================================";
            bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE-ERR",writeTxtFile,1,function(err,wrcallback){});
        }			
    } else {
        console.log("SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY");
        var viewprofileOutput = {};							
        viewprofileOutput['responsecode'] = 2;
        viewprofileOutput['errcode'] = 1;
        viewprofileOutput['Error'] = "SELECT_QRY_WHERE-CLAUSE-ERR__DB-TBL-ERR__SELECT-FIELD-NOTARRAY";
        viewprofileOutput['PARAMETER'] = Query;	
        return next(viewprofileOutput,{});
    }
}


//function to insert the array values to the table //25038395//$insertData, $insertType = 1, $returnType = 1,
exports.bmDbInsert = function(dbhost,dbName,tableName,insertData,insertType=1,primaryKeyFields={},next) {
    var start = bmgeneric.UnixTimeStamp();
    // if (tableName.match(/notesinfo.*/)) {
    //     tableName = "notesinfo";
    // }
    var writeTxtFile = "";
    writeTxtFile += "\nInside INSERT Qry "+bmgeneric.getDate("HH:MM:ss");
    var field_list = value_list = u_query = updateFieldValue = "";
    var insertValueArr =[]; var updateValueArr = [];
    if(bmgeneric.empty(insertData)){	
        return next({'ERROR':'INVALID_INSERT_DATA'},{});
    } else {
        async.forEachOf(insertData, function (value, field, feock) {
            field_list += bmgeneric.trim(field)+", ";
            if(bmgeneric.is_array(value)){
                if(value[0] == global.AESENC)
                {							
                    value_list += "AES_ENCRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
                }else if(value[0] == global.AESDEC)
                {							
                    value_list += "AES_DECRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
                }else if(value[0] == global.DATEADD || value[0] == global.DATESUB)
                {		
                    keyWordDate = (value[0] == global.DATEADD) ? "DATE_ADD" : "DATE_SUB";
                    value_list += keyWordDate+"("+bmgeneric.trim(value[1])+","+bmgeneric.trim(value[2])+"), ";
                    insertValueArr.push(value[3]);
                } else {
                    //+, - operator used as field=field+1 in insert on duplicate key update	
                    value_list += "?, ";
                    if(value[0] == '-')
                        insertValueArr.push(0);
                    else if(value[0] == '+')
                        insertValueArr.push(1);
                }
            } else {			
                if(bmgeneric.trim(field) == 'Name'){
                    if(/^[a-zA-Z]+$/.test(value)){
                        value_list += "'"+value+"',";
                    } else {
                        value_list += "CAST('"+value+"' as BINARY),";
                    }
                } else if(bmgeneric.trim(field) == 'ApiName'){
                    if(/^[a-zA-Z]+$/.test(value)){
                        value_list += "'"+value+"',";
                    } else {
                        value_list += "CAST('"+value+"' as BINARY),";
                    }
                }else if(bmgeneric.trim(value) == global.CURDATETIME)
                {
                    value_list += "NOW(), ";
                } else if(bmgeneric.trim(value) == global.CURDATE)
                {
                    value_list += "CURDATE(), ";
                } else if(bmgeneric.trim(value) == global.CURRTIMESTAMP)
                {
                    value_list += "UNIX_TIMESTAMP(NOW()), ";
                } else {
                    value_list += "?, ";
                    insertValueArr.push(value);
                }
            }
            
            if(insertType == 3 && ! bmgeneric.in_array(field,primaryKeyFields))	//Only for INSERT ON DUPLICATE KEY UPDATE
            {					
                if(bmgeneric.is_array(value))
                {
                    //TO handle insert on duplicate key like field = field+1 OR field = field-1 OR CONCAT(field, '~3')
                    if(bmgeneric.strtoupper(value[0]) == global.CONCATWS)
                    {
                        u_query += field+"= CONCAT_WS('"+value[2]+"',"+field+",'"+value[1]+"'), ";
                    }
                    else if(bmgeneric.strtoupper(value[0]) == global.CONCAT)
                    {
                        u_query += field+"= CONCAT("+field+",'"+value[1]+"'), ";
                    }
                    else if(value[0] == global.AESENC)
                    {
                        u_query += field+"= AES_ENCRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
                    }
                    else if(value[0] == global.AESDEC)
                    {							
                        u_query += field+"= AES_DECRYPT('"+bmgeneric.trim(value[1])+"','"+bmgeneric.trim(value[2])+"'), ";
                    }
                    else if(value[0] == global.DATEADD || value[0] == global.DATESUB)
                    {		
                        keyWordDate = (value[0] == GLOBALS['DATEADD'])?"DATE_ADD":"DATE_SUB";
                        u_query += field+" = "+keyWordDate+"("+bmgeneric.trim(value[1])+","+bmgeneric.trim(value[2])+"), ";
                        updateValueArr.push(value[3]);
                    } else {
                        if(value[0] == '-')						
                            u_query += field+"= IF("+field+" > "+value[1]+","+field+value[0]+value[1]+",0)"+", ";
                        else if(value[0] == '+')
                            u_query += field+"="+field+value[0]+value[1]+", ";
                    }
                } else {
                    if(bmgeneric.trim(value) == global.CURDATETIME)
                    {
                        u_query += field+"= NOW(), ";
                    }
                    else if(bmgeneric.trim(value) == global.CURDATE)
                    {
                        u_query += field+"= CURDATE(), ";
                    }
                    else if(bmgeneric.trim(value) == global.CURRTIMESTAMP)
                    {
                        u_query += field+"= UNIX_TIMESTAMP(NOW()), ";
                    } else {
                        u_query += field+" = ?, ";
                        updateValueArr.push(value);
                    }
                }					
            }				
            feock(null);				
        },function(err){
            console.log("insertValueArr=======",insertValueArr);
            async.parallel({
                CKINQUERY : function(callback){
                    /*bmDb.chkForSqlInjection(insertValueArr, function(err,ipBindArr){
                        if(ipBindArr === true)
                            callback(err,insertValueArr);
                        else
                            callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
                    });*/
                    callback(err,insertValueArr);
                },
                CKUPQUERY : function(callback){
                    if(insertType == 3 && !bmgeneric.empty(updateValueArr)) {
                        /*bmDb.chkForSqlInjection(updateValueArr, function(err,ipBindArr){
                            if(ipBindArr === true)
                                callback(err,updateValueArr);
                            else
                                callback({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
                        });*/
                        callback(err,updateValueArr);
                    } else {
                        callback(null,[]);
                    }
                },
                FROMQUERY : function(callback){
                    bmDb.execQueryIn(dbName,tableName,field_list,value_list,u_query,insertType, function(err,execQuery){
                        if(tableName=="contactinfo" || tableName=="logininfo"){
                            console.log("INSERT_MOBILE_QUERY====:",execQuery);
                        }
                        callback(err,execQuery);
                    });					
                }
            },function(err,preQuery){
                if(!err) {
                    if(!bmgeneric.empty(preQuery.CKINQUERY) ){
                        var bindDataValue = preQuery.CKINQUERY.concat(preQuery.CKUPQUERY);
                        bmDb.bmPreparedQuery(preQuery.FROMQUERY,bindDataValue,function(err,query){
                            bmDb.chkForSqlInjection(query, function(err,ipBindArr){
                                //console.log("bmInsert===================",query,insertValueArr);
                                if(ipBindArr === true){
                                    bmDb.mysqli_query(dbhost,query,preQuery.FROMQUERY,insertValueArr,"INSERT",function(err,insetdata){
                                        next(err,insetdata); 
                                    });
                                }else
                                next({ERROR:"INVALID_WHERECLAUSE_ARR"},[]);
                            });								
                         });
                    }else {
                        next(err,false); 
                    }
                } else {
                    next(err,false); 
                }
            });
        });	
    }
}

exports.chkForSqlInjection = function(chkValue, next){
    var ValCheck = true;
    for (let patVal of global.sqlPatternArr) {
        //console.log("chkForSqlInjection==============",bmgeneric.stripos(chkValue, patVal));
        if(bmgeneric.stripos(chkValue, patVal) > 0){
            ValCheck = false;
        } 
    }		
    return next(null,ValCheck);
}


exports.bmPreparedQuery = function(sql,params,next){
    var paramCount = bmgeneric.count(params);
    var sqlQuery = bmgeneric.str_replace("%", "#~#", sql);
    for (i=0; i < paramCount; i++) {		
        if(params[i] !='' && bmgeneric.is_array(params[i]))
        {
            if(params[i][1] !='' && typeof params[i][1] ==='string'){					
                params[i] = mysql.escape(bmgeneric.trim(params[i][1]));
                    
            }else{
                params[i] = params[i][1];
            }
        } else if(params[i] !='' && typeof params[i] ==='string'){
            params[i] = mysql.escape(params[i]);			
        } 
        sqlQuery = bmgeneric.str_replace('?','%s',sqlQuery);
    }
    var output = vsprintf(sqlQuery, params);
    return next(null,bmgeneric.str_replace("#~#", "%", output));
}


exports.mysqli_query = function(dbHost,query,execQuery,bindDataValue,ErrTxt,resolve){
    var start = bmgeneric.UnixTimeStamp();
    var writeTxtFile = start;
    writeTxtFile += "\nInside "+ErrTxt+" Qry "+bmgeneric.getDate("HH:MM:ss");
    if(typeof(pool) == "object"){	
        pool.getConnection(function (err,SQLMASTERCONN) {				
            if (err) {
                writeTxtFile += "; \nExecQry : "+execQuery;
                writeTxtFile += "; \nQry : "+query;
                writeTxtFile += "; \nDb Host : "+SQLMASTERCONN.config.host;					
                writeTxtFile += "; \nDb Error: DB_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY_ERR";
                writeTxtFile += "\n=====================================================";
                bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE-ERR",writeTxtFile,1,function(err,wrcallback){});
                var viewprofileOutput = {};							
                viewprofileOutput['responsecode'] = 2;
                viewprofileOutput['errcode'] = 1;
                viewprofileOutput['Error'] = "DB_UNABLE_TO_PING_ERR_IN_"+ErrTxt+"_QRY_ERR";
                viewprofileOutput['PARAMETER'] = query;
                return resolve(err, viewprofileOutput);
            }
            SQLMASTERCONN.query(query,bindDataValue, function(err, rows) {
                // And done with the connection.
                SQLMASTERCONN.release();
                if (err) {
                    console.log("SLAVE_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR:",err.code);
                    writeTxtFile += "; \nExecQry : "+execQuery;
                    writeTxtFile += "; \nQry : "+query;
                    writeTxtFile += "; \nDb Host : "+SQLMASTERCONN.config.host;
                    writeTxtFile += "; \nDb SLAVE_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR: "+err;
                    writeTxtFile += "\n=====================================================";
                    bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE-ERR",writeTxtFile,1,function(err,wrcallback){});
                    var viewprofileOutput = {};							
                    viewprofileOutput['responsecode'] = 2;
                    viewprofileOutput['errcode'] = 1;
                    viewprofileOutput['Error'] = "SLAVE_CONNECTION_ERROR_OR_"+ErrTxt+"_QRY_ERR";
                    viewprofileOutput['PARAMETER'] = query;
                    return resolve(err, viewprofileOutput);
                } 
                //console.log("MysqlPool insert=======",rows);
                var end = bmgeneric.UnixTimeStamp();
                console.log("BM "+ErrTxt+" Query Time :" + (end-start) + " Seconds");
                resolve(null, rows);
                /****For SELECT query log delay ****/
                if(end - start > 12)	{
                    writeTxtFile += "; After Execute "+bmgeneric.getDate("HH:MM:ss");
                    writeTxtFile += "; \nExecQry : "+execQuery;
                    writeTxtFile += "; \nQry : "+query;
                    writeTxtFile += "; \nDb Host : "+SQLMASTERCONN.config.host;
                    writeTxtFile += "\n=====================================================";
                    bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE",writeTxtFile,1,function(err,wrcallback){});
                }
            });
        });
    } else {			
        var viewprofileOutput = {};							
        viewprofileOutput['responsecode'] = 0;
        viewprofileOutput['errcode'] = 1;
        viewprofileOutput['Error'] = 'Invalid Host '+dbHost;
        viewprofileOutput['PARAMETER'] = execQuery;
        resolve(viewprofileOutput, {});	
        writeTxtFile += "; \nExecQry : "+execQuery;
        writeTxtFile += "; \nQry : "+query;		
        writeTxtFile += "; \nDb Host : undefined";
        writeTxtFile += "\n=====================================================";
        bmDb.bmDbLogError(ErrTxt+"Qry-SLAVE-ERR",writeTxtFile,1,function(err,wrcallback){});
    }
}

exports.bmDbLogError = function(queName,writeTxtFile,type,next){
    var selectQrylog = bmgeneric.Log_Filename(queName);
    if(!bmgeneric.empty(selectQrylog)) {
        //D:\learn node js\node setup\bin\logs
        var filename = "/learn node js/node setup/bin/logs/"+selectQrylog;
        fs.open(filename, 'a', function(err, id) {
            if(!err){
                fs.write(id, writeTxtFile, null, 'utf8', function(){
                    fs.close(id, function(){
                        console.log('file closed');
                    });
                });
            }
        });
    }
    return next(null,true);
}


exports.execQueryIn = function(dbName,tableName,fieldlist,valuelist,u_query,insertType,next){
    var field_list = bmgeneric.rtrim(fieldlist,", ");
    var value_list = bmgeneric.rtrim(valuelist,", ");
    if(insertType == 3) {
        var $u_query = bmgeneric.rtrim(u_query,", ");
        var execQuery = "INSERT INTO "+dbName+"."+tableName+"("+field_list+") VALUES ("+value_list+") ON DUPLICATE KEY UPDATE "+$u_query;
    } else if (insertType == 2){
        var execQuery = "INSERT IGNORE INTO "+dbName+"."+tableName+"("+field_list+") VALUES ("+value_list+")";
    } else {
        var execQuery = "INSERT INTO "+dbName+"."+tableName+"("+field_list+") VALUES ("+value_list+")";
    }
    return next(null,execQuery);
}	
//   // Close the connection
//   pool.end((err) => {
//     if (err) {
//       console.error('Error closing the connection:', err.message);
//       return;
//     }
//     console.log('Connection closed.');
//   });




// function MysqlSlaveCon(key,ip) {
//     console.log("KEy====",key);
//     console.log("KEy====",ip);
// }


// async.eachOfSeries(DBSLAVEIP,function(mysqlip, mysqlkey, next){
//     console.log('MysqlSlave mysqlip, mysqlkey :',mysqlip, mysqlkey);
//     MysqlSlaveCon(mysqlkey,mysqlip);
//     // next(null);
// },function(err){
//     if(err){
//         console.error("Error:",err);
//     }
// });



// module.exports = connectDB;
