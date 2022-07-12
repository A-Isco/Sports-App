const Joi = require('joi')
const { joiPassword } = require('joi-password');
let user_validation = Joi.object().keys({
    user_name:Joi.string().min(3).required(),
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
    sport:Joi.string()

})

 module.exports =  user_validation