const express = require("express");
const router = express.Router();

const {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    getPlacesBySort,
} = require("../controllers/placesController");

router.route("/").post(createPlace).get(getPlaces);
router.route("/search").get(getPlacesBySearch);
router.route("/filter").get(getPlacesByFilter);

module.exports = router;


