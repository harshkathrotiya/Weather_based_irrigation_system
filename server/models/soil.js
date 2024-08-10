const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Soil Schema
const SoilSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  water_holding_capacity: {
    type: Number, // Measured in percentage or mm of water per meter of soil
    required: true
  },
  nutrient_levels: {
    type: String, // General description or a reference to another model if you have detailed nutrient data
    required: true
  },
  pH_level: {
    type: Number, // pH level of the soil
    required: true
  },
  organic_matter_percentage: {
    type: Number, // Percentage of organic matter in the soil
    required: true
  }
});

// Create and export the Soil model
const Soil = mongoose.model('Soil', SoilSchema);
module.exports = Soil;



