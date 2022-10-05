const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  _id: Number,
  Name: {
    type: String,
    require: true
  },
  English: {
    type: String,
    require: true,
    default: ""
  },
  partent: {
    type: Number,
    require: true
  },
  slug: {
    type: String,
    require: true,
    default: ""
  },
  CreationDate: {
    type: Date,
    default: Date.now
  },
  LastEditDate: {
    type: Date,
    default: Date.now
  }
}, { _id: false, versionKey: false });

categorySchema.plugin(AutoIncrement, { id: 'category_seq', inc_field: '_id' });

module.exports = mongoose.model('categories', categorySchema);

