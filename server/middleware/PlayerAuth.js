const Joi = require('joi');
const {string} = require("joi");

const schema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(30),

    gender: Joi.string().valid('female','male'),

    age:Joi.number()
    .min(0)
    .max(100),

    rate:Joi.number(),

    region:Joi.string(),

    sports:Joi.allow(),


    nationalID: Joi.number()
        .min(2),
    img:Joi.string(),
})
module.exports={schema}





