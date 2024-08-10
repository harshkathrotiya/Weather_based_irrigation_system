const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Crop Schema
const CropSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  water_requirements: {
    type: Number, // Amount of water needed per day (e.g., in liters or millimeters)
    required: true
  },
  optimal_soil_type: {
    type: String, // This could be a reference to a Soil model if you want to link it directly
    required: true
  },
  growth_stage: {
    type: String,
    enum: ['seedling', 'vegetative', 'flowering', 'fruiting'],
    required: true
  },
  planting_date: {
    type: Date,
    required: true
  },
  harvest_date: {
    type: Date,
    required: false
  }
});

// Create and export the Crop model
const Crop = mongoose.model('Crop', CropSchema);
module.exports = Crop;
