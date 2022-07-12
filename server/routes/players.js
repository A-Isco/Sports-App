const express = require("express");
const router = express.Router();
const multer  = require('multer');




var multerStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads');
  },
  filename: function (req, file, cb) {
    const ext=file.mimetype.split('/')[1];
    cb(null, req.file+"."+ext) //Appending .jpg
  }
});

const upload = multer({
  storage:multerStorage
});





const {
  createPlayer,
  getPlayers,
  getPlayersBySearch,
    getPlayer,
  updatePlayer


} = require("../controllers/playersController");
const Player = require("../models/Player");
router.route("/").post(createPlayer).get(getPlayers);
router.route("/search").get(getPlayersBySearch);
router.route("/card/:id").get(getPlayer);
router.patch("/card/:id/update",upload.single('img'),updatePlayer);


module.exports = router;
