const express = require("express");
const router = express.Router();

const {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    getPlacesBySort,
    getPlaceById
} = require("../controllers/placesController");

router.route("/:sport").post(createPlace).get(getPlaces);
router.route("/:sport/search").get(getPlacesBySearch);
router.route("/:sport/filter").get(getPlacesByFilter);
router.route("/:sport/:id").get(getPlaceById);

module.exports = router;


