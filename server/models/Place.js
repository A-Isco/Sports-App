const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String ,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rate: {
        type: Number,
    },
    region: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
   profile: {
        type: String,
    },
    address: {
        type: String,
    },
    images:{
        type:Array,
    }

});

module.exports = mongoose.model("Place", PlaceSchema);