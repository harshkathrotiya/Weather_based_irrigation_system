const mongoose = require('mongoose');
const MailSender = require('../utils/mailsender');
const {otpTemplate} = require('../email/emailVerificationTemplate');

const OTPschema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
});

async function SendVerificationEmail(email,otp)
{
    // Create a transporter to send emails

	// Define the email options

	// Send the email
    try{
        // const mailResponse = await MailSender(email,"mail verification otp",otp);
        const mailResponse = await MailSender(
			email,
			"Verification Email",
            `otp is ${otp}`
		);
		console.log("Email sent successfully: ", mailResponse);

    }catch(error){
        // console.log("while sending email:",error.message);
        console.log("Error occurred while sending email: ", error);
		throw error;
    }
}

OTPschema.pre('save',async function(next){
  
	if (this.isNew) {
		await SendVerificationEmail(this.email, this.otp);
	}
	next();
})

module.exports = mongoose.model("OTP",OTPschema);