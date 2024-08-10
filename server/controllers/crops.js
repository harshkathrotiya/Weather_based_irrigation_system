const Crop = require('../models/crops');

// Get a list of crops
exports.getAllCrops = async (req, res) => {
  try {
    // Fetch all crops from the database
    const crops = await Crop.find({});
    
    // Check if any crops were found
    if (crops.length === 0) {
      return res.status(404).json({ message: 'No crops found' });
    }

    // Send the list of crops as response
    res.status(200).json({
        success:true,
        message:"crops found successfully",
        crops
    });
  } catch (error) {
    console.error('Error fetching crops:', error);
    res.status(500).json({ message: 'Failed to fetch crops' });
  }
}


// Add a new crop
exports.addCrop = async (req, res) => {
  try {
    // Extract crop data from the request body
    const { name, water_requirements, optimal_soil_type, growth_stage, planting_date, harvest_date } = req.body;

    // Validate required fields
    if (!name || !water_requirements || !optimal_soil_type || !growth_stage || !planting_date) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new Crop instance
    const newCrop = new Crop({
      name,
      water_requirements,
      optimal_soil_type,
      growth_stage,
      planting_date,
      harvest_date
    });

    // Save the new crop to the database
    const savedCrop = await newCrop.save();

    // Send the saved crop as the response
    res.status(201).json({
        success:true,
        message:"crop created successfully",
        crop:savedCrop
    });
  } catch (error) {
    console.error('Error adding crop:', error);
    res.status(500).json({ message: 'Failed to add crop' });
  }
};




// Get details about a specific crop by ID
exports.getCropById = async (req, res) => {
  try {
    // Extract crop ID from the request parameters
    const cropId = req.params.id;

    // Find the crop by ID
    const crop = await Crop.findById(cropId);

    // Check if crop was found
    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Send the crop details as the response
    res.status(200).json(
        {
            success:true,
            message:"crops found",
            crop});
  } catch (error) {
    console.error('Error fetching crop details:', error);
    res.status(500).json({ message: 'Failed to fetch crop details' });
  }
};
