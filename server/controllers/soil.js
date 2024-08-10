const Soil = require('../models/soil');
require('dotenv').config();
const axios = require('axios')
// Get a list of soil types
exports.getSoilTypes = async (req, res) => {
    try {
        // Fetch all distinct soil types from the database
        const soilTypes = await Soil.distinct('type');

        // Check if any soil types were found
        if (soilTypes.length === 0) {
            return res.status(404).json({ message: 'No soil types found' });
        }

        // Send the list of soil types as response
        res.status(200).json({
            success: true,
            message: "soil found successfully",
            soilTypes
        });
    } catch (error) {
        console.error('Error fetching soil types:', error);
        res.status(500).json({ message: 'Failed to fetch soil types' });
    }
}


// Add a new soil type
// exports.addSoil = async (req, res) => {
//     try {

//         // Extract soil data from the request body
//         const { type, water_holding_capacity, nutrient_levels, pH_level, organic_matter_percentage } = req.body;

//         // Validate required fields
//         if (!type || !water_holding_capacity || !nutrient_levels || !pH_level || !organic_matter_percentage) {
//             return res.status(400).json({ message: 'type, water holding capacity, and nutrient levels,pH level, organic matter_percentage are required' });
//         }

//         // Check if the soil type already exists by ID
//         const existingSoil = await Soil.findOne({ id });
//         if (existingSoil) {
//             return res.status(400).json({ message: 'Soil type with this ID already exists' });
//         }

//         // Create a new Soil instance
//         const newSoil = new Soil({
//             type,
//             water_holding_capacity,
//             nutrient_levels,
//             pH_level,
//             organic_matter_percentage
//         });

//         // Save the new soil type to the database
//         const savedSoil = await newSoil.save();

//         // Send the saved soil type as the response
//         res.status(201).json(
//             {
//                 success: true,
//                 message: "soil created successfully",
//                 savedSoil
//             });
//     } catch (error) {
//         console.error('Error adding soil type:', error);
//         res.status(500).json({ message: 'Failed to add soil type' });
//     }
// };

exports.addSoil = async (req, res) => {
    // Route to handle the GET request and process the latitude and longitude
    // Access query parameters
    console.log('hello jee');
    const lat = req.query.lat;
    const lon = req.query.lon;

    // Check if lat and lon are provided
    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }
    try {
        console.log(lat,lon);
        const response = await axios.get(process.env.SOIL_API_URL, {
            params: {
                lat,
                lon
            }
            // headers: {
            //     'Authorization': `Bearer ${process.env.SOIL_API_KEY}` // If required by the API
            // }
        });

        const soilData = response.data;

        // Assuming soilData contains the fields you need. Replace these with actual keys from the API response.
        const newSoil = new Soil({
            type: soilData.type,
            water_holding_capacity: soilData.water_holding_capacity,
            nutrient_levels: soilData.nutrient_levels,
            pH_level: soilData.pH_level,
            organic_matter_percentage: soilData.organic_matter_percentage
        });

        await newSoil.save();

        res.json(newSoil);
    } catch (error) {
        res.status(500).json({ error: "Error fetching or saving soil data", details: error.message });
    }

}




// Get details about a specific soil type by ID
exports.getSoilById = async (req, res) => {
    try {
        // Extract soil ID from the request parameters
        const soilId = req.params.id;

        // Find the soil type by ID
        const soil = await Soil.findOne({ id: soilId });

        // Check if soil type was found
        if (!soil) {
            return res.status(404).json({ message: 'Soil type not found' });
        }

        // Send the soil type details as the response
        res.status(200).json(
            {
                success: true,
                message: "soil found successfully",
                soil
            });
    } catch (error) {
        console.error('Error fetching soil type details:', error);
        res.status(500).json({ message: 'Failed to fetch soil type details' });
    }
}



