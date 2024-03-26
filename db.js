require('dotenv').config()
const mongoAddresss = process.env.MONGO_DB
const mongoose = require("mongoose");
const mongoURI = `mongodb://${mongoAddresss}/PdfEditor`;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected To Mongo");

  } catch (err) {
    console.error(err);
  }
};

module.exports = connectToMongo;
