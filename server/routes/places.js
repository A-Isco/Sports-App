const express = require("express");
const router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const DIR = './uploads/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

const {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    createProductReview,
    getPlaceById,
    updatePlace,
    deletePlace
} = require("../controllers/placesController");

router.route("/:sport").post(createPlace).get(getPlaces);
router.post("/:sport/create",upload.array('profile',10),createPlace);
router.route("/:sport/search").get(getPlacesBySearch);
router.route("/:sport/filter").get(getPlacesByFilter);
router.route("/:sport/:id").get(getPlaceById);
router.patch("/:sport/:id/update",upload.array('profile',10),updatePlace);

router.route("/:sport/:id/review").post(createProductReview);
router.route("/:id/delete").delete(deletePlace);



module.exports = router;


