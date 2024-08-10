const User = require('../models/user');
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//send otp
exports.sendOTP = async (req, res) => {
    try {
        //fetch data
        const { email } = req.body;

        //check user email exits or not
        const CheckUserExist = await User.findOne({ email });

        if (CheckUserExist) {
            return res.status(401).json({
                success: false,
                message: "user already exist"
            })
        }

        //otp generate
        var otp =  otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false
        });

        //validate otp is unique
        // let checkOTP = await OTP.findOne({ otp: otp });

        //run until otp match
        // while (checkOTP) {
        //     otp = await otpGenerator.generate(6, {
        //         upperCaseAlphabets: false,
        //         specialChars: false,
        //         lowerCaseAlphabets: false
        //     });
        //     checkOTP = await OTP.findOne({ otp: otp });
        // }

        //create entery on db
        const OTPdb = await OTP.create({
            email,
            otp
        });

        console.log(OTPdb);

        res.status(200).json({
            success: true,
            message: "otp generate successfully",
            otp
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "otp not generated",
            error: error.message
        })
    }
}

exports.signup = async (req, res) => {
    try {
        //fetch data
        const { username,
            email,
            location,
            password,
            confrimPassword,
            otp } = req.body;

        //validate data
        if ( !username ||  !email || !password || !location || !confrimPassword) {
            return res.status(403).json({
                success: false,
                message: "some data missing"
            })
        }
        //check user exits
        const user = await User.findOne({ email })
        if (user) {
            return res.status(401).json({
                success: false,
                message: "user already exist"
            })
        }
        //check both password match
        if (password !== confrimPassword) {
            return res.status(400).json({
                success: false,
                message: 'password and confrim password not match'
            })
        }
        //find most recent otp form db
        const OTPdb = await OTP.findOne({ otp: otp });
        // console.log(OTPdb);
        // console.log("both otp",OTPdb.otp,otp);
        //validate otp
        if (!OTPdb) {
            return res.status(403).json({
                success: false,
                message: "otp number not found",
            })
        } else if (otp != OTPdb.otp) {
            return res.status(403).json({
                success: false,
                message: "otp number invalid"
            });
        }
        //password hash
        const hashedPass = await bcrypt.hash(password, 10);


        //create enter on db
        const CreateUser = await User.create({
            
            username,
            email,
            password: hashedPass,
            location,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${username} ${username}`
        });

        if (!CreateUser) {
            res.status(500).json({
                success: false,
                message: "error during store user info on db",
                error: error.message
            })
        }

        //retrun success response
        res.status(200).json({
            success: true,
            message: "user registred successfully",
            user: CreateUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "some went wrong not registerd user",
            errorMessage: error.message
        })
    }
}


exports.login = async (req, res) => {
    try {
        //fetch data
        const { email, password } = req.body;

        //validate data
        if (!email || !password) {
            return res.status(402).json({
                success: false,
                message: "some data missing"
            })
        }
        //check user exist
        const checkUser = await User.findOne({ email: email })
        

        if (!checkUser) {
            return res.status(400).json({
                success: false,
                message: "user not exits",
            })
        }
        //password match
        if (await bcrypt.compare(password, checkUser.password)) {
            //if password match then create token
            const payload = {
                email: checkUser.email,
                id: checkUser._id,
                location:checkUser.location
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET);
            console.log("token is:", token);
            // checkUser = checkUser.toObject();
            checkUser.token = token;
            checkUser.password = undefined;

            //send cookie
            //send cookie 
            let option = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
            res.cookie('token', token, option);

            res.status(200).json({
                success: true,
                message: "user login successfully",
                user: checkUser,
                token:token
            })
        } else {
            return res.status(403).json({
                success: false,
                message: "password is invalid"
            })
        }
        //retrun success response
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "some went wrong",
            error: error.message
        });
    }
}