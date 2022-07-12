const Joi = require('joi');
const {string} = require("joi");

const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .required(),

    gender: Joi.string().valid('female','male')
        .required(),

    age:Joi.number()
    .min(18)
    .max(100),

    rate:Joi.number(),

    region:Joi.string(),

    sports:Joi.allow(),


    nationalID: Joi.number()
        .min(2)
        .required(),
    img:Joi.string(),
})
module.exports={schema}





