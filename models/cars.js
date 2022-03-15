const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
  },
  type: {
    type: String,
  },
  color: {
    type: String,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
  },
  //created_at : { type: Date, required: true, default: Date.now },
  // createdAt: {
  //   type: Date,
  //   default: function () {
  //     return Date.now();
  //   },
  // },
  // updatedAt: {
  //   type: Date,
  //   default: function () {
  //     return Date.now();
  //   },
  // },
  //timestamps:{createdAt:'created_at', updatedAt:'updated_at'}
  //timestamps: true
});
module.exports = mongoose.model("cars", carSchema);