const axios = require("axios");

const API_URL = process.env.SMS_URL;
module.exports = {
    sendSMS: (phoneNumber, message) => axios({
        method:"POST",
        url :API_URL,
        headers: {
            "content-type":"application/json",
        },
        data: {
            apiName: process.env.SMS_API_NAME,
            apiVersion: process.env.SMS_API_VERSION,
            apiKey:  process.env.SMS_KEY,
            data: [
                {
                    recipients: phoneNumber,
                    message
                }
            ]
        }
    })
}
