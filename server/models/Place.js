const mongoose = require("mongoose");
const reviewSchema = mongoose.Schema(
    {
        // name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String},
        // user: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     required: true,
        //     ref: 'Player',
        // },
    },
    {
        timestamps: true,
    }
)

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
    },
    numReviews: {
        type: Number,

    },
    reviews: [reviewSchema],

});

module.exports = mongoose.model("Place", PlaceSchema);