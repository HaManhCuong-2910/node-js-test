const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const productSchema = new Schema({
  _id: Number,
  ProductID:{
    type: String,
    require: true,
    default: 'VN'
  },
  Title: {
    type: String,
    require: true
  },
  CreationDate: {
    type: Date,
    default: Date.now
  }
}, { _id: false,versionKey: false });

productSchema.plugin(AutoIncrement, {id: 'inhabitant_seq',inc_field: '_id', reference_fields: ['products']});

module.exports = mongoose.model('products', productSchema);

