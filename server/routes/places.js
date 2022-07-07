const express = require("express");
const router = express.Router();

const {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    getPlacesBySort,
} = require("../controllers/placesController");

router.route("/:sport").post(createPlace).get(getPlaces);
router.route("/:sport/search").get(getPlacesBySearch);
router.route("/:sport/filter").get(getPlacesByFilter);

module.exports = router;


