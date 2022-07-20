const mongoose = require("mongoose");

//soft_delete = import mongoose-softdelete from  'mongoose-softdelete';
const reviewSchema = new mongoose.Schema(
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
        default:0
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
        type: Array,
        required:true
    },
    address: {
        type: String,
    },
    numReviews: {
        type: Number,

    },
    available: {
        type: Boolean,
        default: true,

    },
    reviews: [reviewSchema],

});
//PlaceSchema.plugin(soft_delete);

module.exports = mongoose.model("Place", PlaceSchema);
