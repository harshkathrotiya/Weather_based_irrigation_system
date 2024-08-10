const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IrrigationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  crop_id: {
    type: Schema.Types.ObjectId,
    ref: 'Crop',
    required: true
  },
  soil_id: {
    type: Schema.Types.ObjectId,
    ref: 'Soil',
    required: true
  },
  current_moisture_level: {
    type: Number,
    required: true
  },
  irrigation_status: {
    type: String,
    enum: ['on', 'off'],
    default: 'on'
  },
  last_irrigated: {
    type: Date,
    required: true,
    default: Date.now
  },
  duration: {
    type: Number, // Duration in minutes or seconds depending on your application
    required: true
  },
  waterApplied: {
    type: Number, // Amount of water applied (e.g., liters, gallons)
    required: true
  }
});

module.exports = mongoose.model('Irrigation', IrrigationSchema);
