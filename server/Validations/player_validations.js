const Joi = require('joi')
//const BaseJoi = require('joi')

const { joiPassword } = require('joi-password');
// const ImageExtension = require('joi-image-extension')
// const joi = Joi.extend(ImageExtension)


let user_validation = Joi.object().keys({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required(),
    password: joiPassword
                        .string()
                        .minOfSpecialCharacters(2)
                        .minOfLowercase(2)
                        .minOfUppercase(1)
                        .minOfNumeric(1)
                        .noWhiteSpaces()
                        .required(),
    gender:Joi.string().required(),
    birth_date:Joi.date().required(),
    region:Joi.string().min(3).required(),

    isAdmin:Joi.boolean(),
    sports:Joi.allow(),
    img:Joi.allow(),
    age:Joi.number()
        .min(18)
        .max(100),


})

 module.exports =  user_validation
