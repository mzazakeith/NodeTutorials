const Joi = require("joi");

const validateRegistration = (user) =>{
    const schema = Joi.object({
        name : Joi.string().min(4).required(),
        email : Joi.string().min(3).required().email(),
        password: Joi.string().min(8).required(),
        phoneNumber: Joi.string().min(7).max(15).required(),
    })
    return schema.validate(user);
}

const validateLogin = (user) =>{
    const schema = Joi.object({
        email : Joi.string().min(3).required().email(),
        password: Joi.string().min(8).required(),
    })
    return schema.validate(user);
}

const validateOTP = (otp) =>{
    const schema = Joi.object({
        phoneNumber: Joi.string().min(7).max(15).required(),
        oneTimePassword : Joi.string().min(6).max(6).required(),
    })
    return schema.validate(otp)
}

module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
module.exports.validateOTP = validateOTP;
