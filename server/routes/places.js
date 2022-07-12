const express = require("express");
const router = express.Router();

const {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    createProductReview,
    getPlaceById,
    updatePlace
} = require("../controllers/placesController");

router.route("/:sport").post(createPlace).get(getPlaces);
router.route("/:sport/search").get(getPlacesBySearch);
router.route("/:sport/filter").get(getPlacesByFilter);
router.route("/:sport/:id").get(getPlaceById);
router.route("/:sport/:id/update").put(updatePlace);
router.route("/:sport/:id/review").post(createProductReview);



module.exports = router;


