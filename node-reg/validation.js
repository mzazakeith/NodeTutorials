const Joi = require("joi");

const validateRegistration = (user) =>{
    const schema = Joi.object({
        name : Joi.string().min(4).required(),
        email : Joi.string().min(3).required().email(),
        password: Joi.string().min(8).required(),
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
module.exports.validateRegistration = validateRegistration;
module.exports.validateLogin = validateLogin;
