const Place = require("../models/Place");

//*********************** Create Place ***********************
const createPlace = async (req, res) => {
    try {
        // Create a new Place
        const place = new Place({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            rate: req.body.rate,
            region: req.body.region,
            sport:req.body.sport
        });
    
        await place.save();
        res.status(200).json({
            message: `New Place has been Created`,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//*********************** Get Places ***********************
const getPlaces = async (req, res) => {
    let sport = req.params.sport;
    console.log(sport)
    const q = req.query.q;

    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Place.countDocuments({});

    const places = await Place.find({ sport: sport })
        .limit(PAGE_SIZE)
        .skip(PAGE_SIZE * page);

    res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        places,
    });
};

// *********************** Search ***********************
const getPlacesBySearch = async (req, res) => {
    let sport = req.params.sport;
   const q = req.query.q;

    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");

    const places = await Place.find({sport:sport});

    const keys = ["name"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    const result = search(places);
    // console.log(result.length);
    const total = result.length;
    const limit = 3;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        places: result.slice(startIndex, endIndex),
    });
};

// *********************** Filter ************************
const getPlacesByFilter = async (req, res) => {
    let sport = req.params.sport;
    let region = req.query.region;
    let sortAttribute = req.query.sortAttribute;
    let sortWay = req.query.sortWay;

    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const limit = 3;

    // Region Only
    if (region && sortAttribute == false && sortWay == false) {
        const places = await Place.find({ region: region ,sport:sport});
        const total = places.length;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        res.json({
            totalPages: Math.ceil(total / PAGE_SIZE),
           places: places.slice(startIndex, endIndex),
        });
    }

    // Sort only " default desc order "
    if (sortAttribute && region == false && sortWay == false) {
        if (sortAttribute == "rate") {
            const places = await Place.find({sport:sport}).sort({ rate: -1 });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }
        if (sortAttribute == "price") {
            const places= await Place.find({sport:sport}).sort({ price: -1 });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }
    }

    // Region & sortAttribute " default desc order "
    if (sortAttribute && region && sortWay == false) {
        if (sortAttribute == "rate") {
            const places = await Place.find({ region: region,sport:sport }).sort({
                rate: -1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }

        if (sortAttribute == "price") {
            const places = await Place.find({ region: region ,sport:sport }).sort({
                price: -1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }
    }

    // sortAttribute && sortType
    if (sortAttribute && sortWay && region == false) {
        if (sortWay == "asc" && sortAttribute == "rate") {
            const places = await Place.find({sport:sport}).sort({
                rate: 1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }

        if (sortWay == "desc" && sortAttribute == "rate") {
            const places = await Place.find({sport:sport}).sort({
                rate: -1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }

        if (sortWay == "asc" && sortAttribute == "price") {
            const places = await Place.find({sport:sport}).sort({
               price: 1,
            });
            const total =places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }

        if (sortWay == "desc" && sortAttribute == "price") {
            const places = await Place.find({sport:sport}).sort({
                price: -1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }
    }

    // Region & sortAttribute & sortType
    if (sortAttribute && sortWay && region) {
        if (sortWay == "asc" && sortAttribute == "rate") {
            const places = await Place.find({ region: region , sport:sport }).sort({
                rate: 1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
               places: places.slice(startIndex, endIndex),
            });
        }

        if (sortWay == "desc" && sortAttribute == "rate") {
            const places = await Place.find({ region: region , sport:sport }).sort({
                rate: -1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }

        if (sortWay == "asc" && sortAttribute == "price") {
            const places = await Place.find({ region: region , sport:sport}).sort({
                price: 1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
               places: places.slice(startIndex, endIndex),
            });
        }

        if (sortWay == "desc" && sortAttribute == "price") {
            const places = await Place.find({ region: region ,sport:sport }).sort({
               price: -1,
            });
            const total = places.length;

            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;

            res.json({
                totalPages: Math.ceil(total / PAGE_SIZE),
                places: places.slice(startIndex, endIndex),
            });
        }
    }
};

const getPlaceById = async (req, res) => {
    const placeId = req.params.id;
    const place=await Place.findById(placeId)
    res.send(place);

};

module.exports = {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    getPlaceById
};

/*
   => Create Player
   => Get All Players (sport)
      " To retrieve players and display them depending on sport type "
   => Get Player (:id)
      " To get player details viewed "
   => Edit Player (:id)
      " To update player data "
*/