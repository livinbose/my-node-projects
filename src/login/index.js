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

router.post('/loginemail',loginControl);
router.get('/loginemail',loginControl);

router.post('/updateapi/:ID',loginControl)
router.get('/updateapi/:ID',loginControl)

router.post('/forgot-password/:ID',loginControl)
router.get('/forgot-password/:ID',loginControl)

router.post('/video/:ID',loginControl)
router.get('/video/:ID',loginControl)



// // Configure Multer for File Uploads
// const storage = multer.diskStorage({
//     destination: "./uploads/", // Folder to save images
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname); // Unique filename
//     },
//   });
//   const upload = multer({ storage: storage });
const path =require('path');
  // Set storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "./uploads/"; // Ensure this folder exists!
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Ensure 'uploads' folder exists
// const fs = require("fs");
if (!fs.existsSync("./uploads/")) {
    fs.mkdirSync("./uploads/");
}

router.post('/imageupload/:ID',upload.single("image"),loginControl)
router.get('/imageupload/:ID',upload.single("image"),loginControl)


module.exports = router;
