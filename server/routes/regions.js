const express = require("express");
const router = express.Router();

const {
    getRegions
} = require("../controllers/regionsController");

router.route("/").get(getRegions);


module.exports = router;
