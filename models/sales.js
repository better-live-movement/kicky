const mongoose = require('mongoose');

let now = new Date();
let twentyFour = new Date(now.getTime() + 24*60*60*1000);

const saleSchema = mongoose.Schema({
  productName: String,
  link: String,
  saleStart: {type: Date, default: Date.now},
  saleEnd: {type: Date, default: twentyFour},
});

const salesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  guild: { type: String, ref: 'Guild', required: true},
  moduleActive: {type: Boolean, default: false},
  sendSalesPrivate: {type: Boolean, default: false},
  sales : [saleSchema]
});

module.exports = mongoose.model('Sales', salesSchema);
