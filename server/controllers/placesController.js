const Place = require("../models/Place");
const {Player} = require("../models/Player");

//*********************** Create Place ***********************
const createPlace = async (req, res) => {
    try {
        // Create a new Place

            const images = []
            const url = req.protocol + '://' + req.get('host');
            for (var i = 0; i < req.files.length; i++) {
                images.push(url + '/uploads/' + req.files[i].filename)
            }
            const placeProfile = await Place.findByIdAndUpdate(req.params.id, {
                profile: images
            }, {
                new: true,
                runValidators: true
            });

        const place = new Place({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            rate: req.body.rate,
            region: req.body.region,
            profile: images,
            sport: String(req.body.sport),
            address:req.body.address
        });

        //console.log(place);

        await place.save();
        res.status(200).json({
            message: `New Place has been Created`,
        });
    } catch (error) {
        res.status(500).send(error);
        console.log(error.message)
    }
};

//*********************** Get Places ***********************
const getPlaces = async (req, res) => {
    let sport = req.params.sport;
   // console.log(sport)
    const q = req.query.q;

    const PAGE_SIZE = 3;
    const page = parseInt(req.query.page || "0");
    const total = await Place.countDocuments({
        sport: sport,
        available:true
    });

    const places = await Place.find({
            sport: sport,
           available:true
        })
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

    const places = await Place.find({
        sport: sport,
        available:true
    });

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
        const places = await Place.find({
            region: region,
            sport: sport,
            available:true
        });
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
            const places = await Place.find({
                sport: sport,
                available:true
            }).sort({
                rate: -1
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
            const places = await Place.find({
                sport: sport,
                available:true
            }).sort({
                price: -1
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

    // Region & sortAttribute " default desc order "
    if (sortAttribute && region && sortWay == false) {
        if (sortAttribute == "rate") {
            const places = await Place.find({
                region: region,
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                region: region,
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                region: region,
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                region: region,
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                region: region,
                sport: sport,
                available:true
            }).sort({
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
            const places = await Place.find({
                region: region,
                sport: sport,
                available:true
            }).sort({
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
    const place = await Place.findById(placeId)
    res.send(place);

};

const updatePlace = async (req, res) => {

    if (req.files) {
        const images = []
        const url = req.protocol + '://' + req.get('host');
        for (var i = 0; i < req.files.length; i++) {
            images.push(url + '/uploads/' + req.files[i].filename)
        }
        const placeProfile = await Place.findByIdAndUpdate(req.params.id, {
            profile: images
        }, {
            new: true,
            runValidators: true
        });
    }


    const place = await Place.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.send(req.body);
    //console.log(place);
};
const deletePlace = async (req, res) => {




    const place = await Place.findByIdAndUpdate(req.params.id, {available:false},{
        new:true
        }

    )
    res.status(200).send("deleted");




};
const createProductReview = async (req, res) => {

    const placeId = req.params.id;
    const playerId=req.player_id.id


    const {
        rating,
        comment,
        player,
    } = req.body
    const place = await Place.findById(placeId)
    const review = {
        rating: Number(rating),
        comment,
       Player:player,
    }
    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk",review)

    place.reviews.push(review)

    place.numReviews = place.reviews.length

    place.rate = (place.reviews.reduce((acc, item) => item.rating + acc, 0) / place.numReviews).toFixed(1)
    await place.save()
    res.status(201).json({
        message: 'Review added'
    })

};


module.exports = {
    createPlace,
    getPlaces,
    getPlacesBySearch,
    getPlacesByFilter,
    getPlaceById,
    updatePlace,
    createProductReview,
    deletePlace
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
