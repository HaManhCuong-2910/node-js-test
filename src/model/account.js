const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  _id: Number,
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
  }
}, { _id: false,versionKey: false });

accountSchema.plugin(AutoIncrement, {id: 'account_seq',inc_field: '_id', reference_fields: ['accounts']});

module.exports = mongoose.model('account', accountSchema);

