const express = require("express");
const router = express.Router();

const {
  createPlayer,
  getPlayers,
  getPlayersBySearch,
  getPlayersByFilter,
  getPlayersBySort,
} = require("../controllers/playersController");

router.route("/").post(createPlayer).get(getPlayers);
router.route("/search").get(getPlayersBySearch);
router.route("/filter").get(getPlayersByFilter);

module.exports = router;
