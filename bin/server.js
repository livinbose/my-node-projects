/**********************************************************************************************
 *	Filename	  : server.js							
 *	Author		  : Livin bose S
 *	Date		    : 07-02-2025				
 *	Description	: My App Api Server
 *  Versions    : Node - v14.11.0 & NPM  - 6.5.0
***********************************************************************************************/
/**
 * Module dependencies.
 */

"use strict";

const app = require("../app");
const http = require("http");
const https = require("https");
const fs = require("fs");

console.info(`Program is using ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB of Heap.`);

// Error Handling for Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`[${new Date().toUTCString()}] Uncaught Exception: ${err.message}`);
  console.error(err.stack);
});

// Handle Unhandled Promise Rejections
const rejections = new Map();
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  rejections.set(promise, reason);
});
process.on("rejectionHandled", (promise) => {
  rejections.delete(promise);
});

// email: admin@mail.com
// pass: admin
const startServer = (serve) => {
  const HTTP_PORT = NBinit[NBinit.ENV].http.port; // process.env.HTTP_PORT || 5000;
  console.log("HTTP_PORT=======", HTTP_PORT);
  const HTTPS_PORT = process.env.HTTPS_PORT || 3443;

  // Create and start HTTP server
  const httpServer = http.createServer(app);
  httpServer.listen(HTTP_PORT,"0.0.0.0", () => {
    console.log(`✅ HTTP Server is running on port ${HTTP_PORT}`);
  });

  httpServer.timeout = 2 * 60 * 1000; // 2-minute timeout
  httpServer.on("error", (error) => console.error("❌ HTTP Server Error:", error));


  if (serve == 1 || serve == 2) {
    console.log("serve=========",serve);
    try {
      const privateKey = fs.readFileSync("./bin/cert/key.pem", "utf8");
      const certificate = fs.readFileSync("./bin/cert/server.crt", "utf8");

      const httpsServer = https.createServer({ key: privateKey, cert: certificate }, app);
      httpsServer.listen(HTTPS_PORT, () => {
        console.log(`HTTPS Server is running on port ${HTTPS_PORT}`);
      });

      httpsServer.timeout = 2 * 60 * 1000; // 2-minute timeout
      httpsServer.on("error", (error) => console.error("HTTPS Server Error:", error));
    } catch (err) {
      console.error("Error setting up HTTPS Server:", err.message);
    }
  }

};

// Start the server
const serveMode = process.env.SERVE || 0;

// Start both HTTP and HTTPS servers
startServer(serveMode);
