// models/billet.js
const mongoose = require('mongoose');

const billetSchema = new mongoose.Schema({
  code: { type: String, required: true },
  valide: { type: Boolean, default: false },
  dateScan: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billet', billetSchema);
