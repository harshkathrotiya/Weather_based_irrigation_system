const Irrigation = require('../models/IrrigationSchedule');
const Crop = require('../models/crops');
const Soil = require('../models/soil');
const User = require('../models/user');
const Weather = require('../models/weatherData');


// Start irrigation for a specific crop and soil combination
exports.startIrrigation = async (req, res) => {
    try {
        // Extract userId, cropId, soilId, and duration from the request body
        const { userId, cropId, soilId, current_moisture_level, duration } = req.body;

        // Validate required fields
        if (!userId || !cropId || !soilId || duration === undefined) {
            return res.status(400).json({ message: 'User ID, Crop ID, Soil ID, and duration are required' });
        }

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the crop exists
        const crop = await Crop.findById(cropId);
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }

        // Check if the soil type exists
        const soil = await Soil.findById(soilId);
        if (!soil) {
            return res.status(404).json({ message: 'Soil type not found' });
        }

        // Calculate irrigation needs based on crop and soil properties
        const waterNeeded = calculateWaterNeeds(crop, soil, duration);

        // Create a new Irrigation record
        const newIrrigation = new Irrigation({
            user_id: userId,
            crop_id: cropId,
            soil_id: soilId,
            current_moisture_level,
            irrigation_status: 'on',
            last_irrigated: new Date(),
            duration,
            waterApplied: waterNeeded,
        });

        // Save the irrigation record to the database
        const savedIrrigation = await newIrrigation.save();

        // Return the irrigation details as the response
        res.status(201).json({
            success: true,
            message: "",
            savedIrrigation
        });
    } catch (error) {
        console.error('Error starting irrigation:', error);
        res.status(500).json({ message: 'Failed to start irrigation' });
    }
};

// Helper function to calculate water needs based on crop and soil properties
function calculateWaterNeeds(crop, soil, duration) {
    // Example calculation based on water_holding_capacity and crop water needs
    const baseWaterNeed = crop.water_requirements;
    const soilFactor = soil.water_holding_capacity;
    return baseWaterNeed * soilFactor * duration;
}


// Stop irrigation
exports.stopIrrigation = async (req, res) => {
    try {
        const { irrigation_id } = req.body;

        // Validate required fields
        if (!irrigation_id) {
            return res.status(400).json({ message: 'Irrigation ID is required' });
        }

        // Find the irrigation record by ID
        const irrigation = await Irrigation.findById(irrigation_id);

        if (!irrigation) {
            return res.status(404).json({ message: 'Irrigation record not found' });
        }

        // Check if the irrigation is already stopped
        if (irrigation.irrigation_status === 'off') {
            return res.status(400).json({ message: 'Irrigation is already stopped' });
        }

        // Calculate the actual duration (in minutes) that the irrigation was running
        const now = new Date();
        const actualDuration = Math.round((now - irrigation.last_irrigated) / 60000); // Convert milliseconds to minutes

        // Update the irrigation status to 'off' and update the duration
        irrigation.irrigation_status = 'off';
        irrigation.duration = actualDuration;

        // Save the updated irrigation record to the database
        const updatedIrrigation = await irrigation.save();

        // Return the updated irrigation details as the response
        res.status(200).json(
            {
                success: true,
                message: "irrigation is updated",
                updatedIrrigation
            });
    } catch (error) {
        console.error('Error stopping irrigation:', error);
        res.status(500).json({ message: 'Failed to stop irrigation' });
    }
};



// Get the current irrigation status and recommendations
exports.getIrrigationStatus = async (req, res) => {
    try {
        const { user_id } = req.query;

        // Validate that the user_id is provided
        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Find the latest irrigation record for the user
        const irrigation = await Irrigation.findOne({ user_id })
            .sort({ last_irrigated: -1 }) // Sort by the most recent
            .populate('crop_id soil_id');

        if (!irrigation) {
            return res.status(404).json({ message: 'No irrigation record found for the user' });
        }

        // Create recommendations based on the irrigation status and other conditions
        let recommendations = [];

        if (irrigation.irrigation_status === 'on') {
            recommendations.push('Irrigation is currently running. Monitor moisture levels and adjust as necessary.');
        } else {
            recommendations.push('Irrigation is off. Check soil moisture and consider irrigating if levels are low.');
        }

        // Example recommendation based on moisture levels
        if (irrigation.current_moisture_level < 30) {
            recommendations.push('Soil moisture is low. Consider starting irrigation.');
        } else if (irrigation.current_moisture_level > 70) {
            recommendations.push('Soil moisture is high. Avoid overwatering.');
        }

        // Return the current irrigation status and recommendations
        res.status(200).json({
            success: true,
            message: "current irrigation and recommendations",
            irrigation_status: irrigation.irrigation_status,
            crop: irrigation.crop_id.name,
            soil: irrigation.soil_id.type,
            current_moisture_level: irrigation.current_moisture_level,
            last_irrigated: irrigation.last_irrigated,
            recommendations: recommendations
        });
    } catch (error) {
        console.error('Error getting irrigation status:', error);
        res.status(500).json({ message: 'Failed to get irrigation status' });
    }
};



// Get recommendations on irrigation schedules
exports.getIrrigationRecommendations = async (req, res) => {
  try {
    const { user_id, crop_id, soil_id } = req.query;

    // Validate that all necessary parameters are provided
    if (!user_id || !crop_id || !soil_id) {
      return res.status(400).json({ message: 'User ID, Crop ID, and Soil ID are required' });
    }

    // Fetch the current weather data for the user
    const weatherData = await Weather.findOne({ user_id }).sort({ timestamp: -1 }); // Assuming Weather model stores user's location-based data

    if (!weatherData) {
      return res.status(404).json({ message: 'No weather data found for the user' });
    }

    // Fetch the soil data
    const soil = await Soil.findById(soil_id);

    if (!soil) {
      return res.status(404).json({ message: 'Soil data not found' });
    }

    // Fetch the crop data
    const crop = await Crop.findById(crop_id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop data not found' });
    }

    // Fetch the most recent irrigation record for this crop and soil combination
    const irrigation = await Irrigation.findOne({ user_id, crop_id, soil_id }).sort({ last_irrigated: -1 });

    // Calculate the recommendations based on weather, soil, and crop data
    let recommendations = [];

    // Weather-based recommendation
    if (weatherData.temperature > 30) {
      recommendations.push('High temperatures detected. Increase irrigation frequency to prevent crop dehydration.');
    } else if (weatherData.rainfall > 5) {
      recommendations.push('Recent rainfall detected. Consider reducing irrigation to avoid waterlogging.');
    }

    // Soil-based recommendation
    if (soil.water_holding_capacity < 50) {
      recommendations.push('Soil has low water holding capacity. Increase irrigation frequency to maintain adequate moisture.');
    } else {
      recommendations.push('Soil has good water holding capacity. Maintain current irrigation schedule.');
    }

    // Crop-based recommendation
    if (crop.water_requirements > 50) {
      recommendations.push(`${crop.name} requires a lot of water. Ensure frequent irrigation, especially during growth stages.`);
    } else {
      recommendations.push(`${crop.name} has moderate water requirements. Adjust irrigation according to weather conditions.`);
    }

    // Irrigation-based recommendation
    if (irrigation) {
      if (irrigation.current_moisture_level < 30) {
        recommendations.push('Soil moisture is low. Start irrigation soon to prevent crop stress.');
      } else if (irrigation.current_moisture_level > 70) {
        recommendations.push('Soil moisture is high. Delay irrigation to avoid overwatering.');
      } else {
        recommendations.push('Soil moisture is adequate. Maintain current irrigation schedule.');
      }
    } else {
      recommendations.push('No prior irrigation data found. Start with a moderate irrigation schedule and adjust as necessary.');
    }

    // Return the recommendations
    res.status(200).json({
      crop: crop.name,
      soil: soil.type,
      weather: {
        temperature: weatherData.temperature,
        rainfall: weatherData.rainfall,
        humidity: weatherData.humidity
      },
      recommendations: recommendations
    });
  } catch (error) {
    console.error('Error getting irrigation recommendations:', error);
    res.status(500).json({ message: 'Failed to get irrigation recommendations' });
  }
}