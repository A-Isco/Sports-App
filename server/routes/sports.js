const express = require("express");
const router = express.Router();

const {
    getSports
} = require("../controllers/sportsController");

router.route("/").get(getSports);


module.exports = router;
