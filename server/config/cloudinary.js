const cloudiary = require('cloudinary').v2;

require('dotenv').config();

exports.cloudiaryConnection = () => {
    try {
        cloudiary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
    } catch (error) {
        console.log('cloudinary not connection');
        console.log(error.message);
    }
}