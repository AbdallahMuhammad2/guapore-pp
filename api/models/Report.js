// api/models/Report.js
const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  description: String,
  category: String,
  latitude: Number,
  longitude: Number,
  imageUrl: String,
  status: { type: String, default: 'Recebido' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', ReportSchema);
