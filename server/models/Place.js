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
});

module.exports = mongoose.model("Place", PlaceSchema);