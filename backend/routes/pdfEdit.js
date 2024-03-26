const multer = require('multer');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');
const File = require('../schema/metadata');
const express = require('express'); // Import express
const router = express.Router(); // Create a router instance

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), async function (req, res) {
  try {
    const queryData = JSON.parse(req.body.query);
    const existingPdfBytes = await fs.promises.readFile(req.file.path); 
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const newPdf = await PDFDocument.create();

    const copyPage = await newPdf.copyPages(pdfDoc, queryData);

    copyPage.forEach((page) => {
      newPdf.addPage(page);
    });

    const pdfBytes = await newPdf.save();
    await fs.promises.writeFile(path.join('updateUploads', `update_${req.file.originalname}`), pdfBytes); 

    const filePath = path.join("updateuploads", `update_${req.file.originalname}`); 
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': stat.size
    });
    const readStream = fs.createReadStream(filePath);

    if (req.body.email) {
      console.log(req.body);
      const connectToMongo = require('./db');
      connectToMongo();
      const FileInfo = await File.create({
        email: req.body.email,
        filename: req.file.originalname,
        contentType: newPdf.mimetype
      });
    }

    readStream.pipe(res);    
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; // Export the router
