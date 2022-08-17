const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  Email:{
    type: String,
    require: true
  },
  Name: {
    type: String,
    require: true
  },
  avatar: {
    type: String
  },
  Address: {
    type: String
  },
  Mobile: {
    type: String,
    require: true
  },
  Password: {
    type: String,
    require: true
  },
  CreationDate: {
    type: Date,
    default: Date.now
  },
  LastEditDate: {
    type: Date,
    default: Date.now
  },
  LastLoginDate: {
    type: Date
  },
  iTruyCap: {
    type: Number,
    require: true,
    default: 1
  },
  Status:{
    type: Number,
    require: true,
    default: 1
  },
  typeAcc:{
    type: Number,
    require: true,
    default: 0
  }
}, {versionKey: false });


module.exports = mongoose.model('accounts', accountSchema);

