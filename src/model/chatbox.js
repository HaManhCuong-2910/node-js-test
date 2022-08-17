const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatboxSchema = new Schema({
  listMess:{
    type: Array,
    require: true
  },
  CreationDate: {
    type: Date,
    default: Date.now
  },
  LastEditDate: {
    type: Date,
    default: Date.now
  }
}, {versionKey: false });

module.exports = mongoose.model('chatboxes', chatboxSchema);

