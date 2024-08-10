const User = require('../models/user');
const axios = require('axios');
require('dotenv').config();

exports.getCurrentWeatherData = async (req, res) => {
    try {
        //it using middleware set
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const location = user.location;
        const response = await axios.get(process.env.WEATHER_API_URL, {
            params: {
                q: location,
                appid: process.env.WEATHER_API_KEY,
                units: 'metric' // 'metric' for Celsius, 'imperial' for Fahrenheit
            }
        });

        //get response 
        const weatherData = response.data;

        const currentWeather = {
            location: location,
            temperature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            description: weatherData.weather[0].description,
            wind_speed: weatherData.wind.speed,
            weather_icon: weatherData.weather[0].icon
        };

        // Send the weather data as response
        res.status(200).json(currentWeather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ message: 'Failed to fetch weather data',
            errormessage:error.message
         });
    }
}