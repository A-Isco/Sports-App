const express = require("express");
const router = express.Router();

const {
  createPlayer,
  getPlayers,
  getPlayersBySearch,
} = require("../controllers/playersController");

router.route("/").post(createPlayer).get(getPlayers);
router.route("/search").get(getPlayersBySearch);

module.exports = router;
