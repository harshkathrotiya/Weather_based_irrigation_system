const express = require('express');
const app = express();


//set middleware
const dotenv = require('dotenv');
dotenv.config();

const cookieparser = require('cookie-parser');
app.use(cookieparser());


app.use(express.json())

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    tempFileDir:'/tmp',
    useTempFiles:true
}));


//mount the routes
const userRoutes = require('./routers/user');
const soilRoutes = require('./routers/soil');
const cropsRoutes = require('./routers/crops');
const weatherDataRoutes = require('./routers/weatherData');
const irriagtion = require('./routers/irrigation');

app.use('/api/v1/auth',userRoutes);
app.use('/api/v1/soil',soilRoutes);
app.use('/api/v1/crops',cropsRoutes);
app.use('/api/v1/weatherData',weatherDataRoutes);
app.use('/api/v1/irriagtion',irriagtion);

//cloudiary connection
const cloudiary = require('./config/cloudinary');
cloudiary.cloudiaryConnection();


//database connect
const connectDB = require('./config/database');
connectDB();


//activate server
const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`server started at ${port}`);
})

//default route
app.get('/',(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    })
})
