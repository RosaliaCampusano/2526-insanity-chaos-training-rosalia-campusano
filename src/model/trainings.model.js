const mongoose = require("mongoose");

const { Schema } = mongoose;

const warriorsSchema = new Schema({
  _id: false,
  name: String,
  weaponName: String,
  durability: Number,
  gold: Number,
  state: String,
});

const trainingSchema = new Schema({
  epicDate: String,
  warriors: [warriorsSchema],
});

const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
