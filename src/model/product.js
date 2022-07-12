const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  Title: {
    type: String,
    require: true
  },
  CreationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('products', productSchema);

