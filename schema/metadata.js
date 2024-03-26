const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  email: { type: String },
  filename: String,
  contentType: String,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
