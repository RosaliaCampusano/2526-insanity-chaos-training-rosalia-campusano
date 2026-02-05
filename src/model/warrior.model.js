const mongoose = require("mongoose");

const { Schema } = mongoose;

const warriorSchema = new Schema({
  name: String,
  strength: Number,
  gold: Number,
  weapon: Object,
});

const Warrior = mongoose.model("Warrior", warriorSchema);

module.exports = Warrior;
