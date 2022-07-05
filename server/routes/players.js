const express = require("express");
const router = express.Router();

const {
  createPlayer,
  getPlayers,
  getPlayersBySearch,
    getPlayer,
  updatePlayer


} = require("../controllers/playersController");
router.route("/").post(createPlayer).get(getPlayers);
router.route("/search").get(getPlayersBySearch);
router.route("/card/:id").get(getPlayer);
router.route("/card/:id/update").put(updatePlayer);

module.exports = router;
