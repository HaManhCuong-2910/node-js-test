const mongoose = require('mongoose');
require('dotenv').config();
async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log("connection successfully!!!");
  }
  catch (error) {
    console.log("connection fail!!!");
  }
}

module.exports = { connect }