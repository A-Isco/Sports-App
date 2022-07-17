const Player = require("../models/Player");

const {schema}=require("../middleware/PlayerAuth");
const multer  = require('multer')
const Place = require("../models/Place");




// Create Player
const createPlayer = async (req, res) => {
  try {
    // Create a new Player
    const player = new Player({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      rate: req.body.rate,
      region: req.body.region,
    });

    await player.save();
    res.status(200).json({
      message: `New Player has been Created`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// *********************** Get Players ***********************
const getPlayers = async (req, res) => {
  console.log("here")
  // const q = req.query.q;
  let sport = req.params.sport;
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const total = await Player.countDocuments({sports:sport});

  const players = await Player.find({sports:sport})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    players,
  });
};

// *********************** Search ***********************
const getPlayersBySearch = async (req, res) => {
  const q = req.query.q;
  let sport = req.params.sport;
  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");

  const players = await Player.find({sports:sport});

  const keys = ["name"];

  const search = (data) => {
    return data.filter((item) =>
        keys.some((key) => item[key].toLowerCase().includes(q))
    );
  };

  const result = search(players);
  // console.log(result.length);
  const total = result.length;
  const limit = 3;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    players: result.slice(startIndex, endIndex),
  });
};
//get 1 player

const getPlayer = async (req, res) => {
  console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj")
  console.log(req);

  //const playerId = req.params.id;
  const playerId=req.player_id.id
  console.log(playerId)
  const player=await Player.findById(playerId)
  console.log(player)
  res.send(player);

};
const updatePlayer=async (req,res)=>{
  console.log("up")
  console.log(req.file)
  //console.log(req.params.id)
  console.log(req.body)
  console.log(req.body)
  try {
    //const value =  playerauth.validate(req.body);
    const value=schema.validate(req.body);
    //console.log("val")
   // console.log(req.file.mimetype)
   //  const splitted=req.file.mimetype.split("/");
   //  console.log("llllllllllllllllllllllllllllllllllllllll");
   //  console.log(splitted[1]);
    id=req.player_id.id
    const my_sports=req.body.sports;
    //console.log("sports");
    //console.log(my_sports)
    sports_arr=my_sports.split(',');
    //console.log("ibsgjfnmdc mcmndmndmncdfdc,dnfkldjlkfjlkdfmf");



    console.log("storage")
    //console.log(storage);




    if(!value.error){
    const player1= await Player.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
    const playersports=await Player.findByIdAndUpdate(id,{sports:sports_arr},{new:true,runValidators:true});

      if (req.file){
      const inserted_image=req.file.path;
      console.log(inserted_image)


      const playerimg=await Player.findByIdAndUpdate(id,{img:inserted_image},{new:true,runValidators:true});

    }
      res.send(player1);
    }else {
   res.status(400);
  res.send(value);
    }
  }
  catch (err) {
    res.send(err)
    console.log(err)
  }
};
// app.post('/profile', upload.single('img'), function (req, res, next) {
//   // req.file is the `avatar` file
//   // req.body will hold the text fields, if there were any
// })

// *********************** Filter ************************
const getPlayersByFilter = async (req, res) => {
  let sport = req.params.sport;
  let region = req.query.region;
  let sortAttribute = req.query.sortAttribute;
  let sortWay = req.query.sortWay;

  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const limit = 3;

  // Region Only
  if (region && sortAttribute == false && sortWay == false) {
    const players = await Player.find({ region: region ,sports:sport});
    const total = players.length;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    res.json({
      totalPages: Math.ceil(total / PAGE_SIZE),
      players: players.slice(startIndex, endIndex),
    });
  }

  // Sort only " default desc order "
  if (sortAttribute && region == false && sortWay == false) {
    if (sortAttribute == "rate") {
      const players = await Player.find({sports:sport}).sort({ rate: -1 });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }
    if (sortAttribute == "age") {
      const players = await Player.find({sports:sport}).sort({ age: -1 });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }
  }

  // Region & sortAttribute " default desc order "
  if (sortAttribute && region && sortWay == false) {
    if (sortAttribute == "rate") {
      const players = await Player.find({ region: region ,sports:sport }).sort({
        rate: -1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortAttribute == "age") {
      const players = await Player.find({ region: region  ,sports:sport}).sort({
        age: -1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }
  }

  // sortAttribute && sortType
  if (sortAttribute && sortWay && region == false) {
    if (sortWay == "asc" && sortAttribute == "rate") {
      const players = await Player.find({sports:sport}).sort({
        rate: 1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortWay == "desc" && sortAttribute == "rate") {
      const players = await Player.find({sports:sport}).sort({
        rate: -1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortWay == "asc" && sortAttribute == "age") {
      const players = await Player.find({sports:sport}).sort({
        age: 1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortWay == "desc" && sortAttribute == "age") {
      const players = await Player.find({sports:sport}).sort({
        age: -1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }
  }

  // Region & sortAttribute & sortType
  if (sortAttribute && sortWay && region) {
    if (sortWay == "asc" && sortAttribute == "rate") {
      const players = await Player.find({ region: region ,sports:sport }).sort({
        rate: 1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortWay == "desc" && sortAttribute == "rate") {
      const players = await Player.find({ region: region ,sports:sport}).sort({
        rate: -1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortWay == "asc" && sortAttribute == "age") {
      const players = await Player.find({ region: region ,sports:sport }).sort({
        age: 1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }

    if (sortWay == "desc" && sortAttribute == "age") {
      const players = await Player.find({ region: region ,sports:sport }).sort({
        age: -1,
      });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }
  }
};

const createPlayerReview = async (req, res) => {

  const placeId = req.params.id;
  const { rating} = req.body
  const player=await Player.findById(placeId)
  const review = {

    rating: Number(rating)

  }

  player.reviews.push(review)

  player.numReviews = player.reviews.length

  player.rate = (player.reviews.reduce((acc, item) => item.rating + acc, 0) / player.numReviews).toFixed(1)
  await player.save()
  res.status(201).json({ message: 'Review added' })

};

module.exports = {
  createPlayer,
  getPlayers,
  getPlayersBySearch,
  getPlayersByFilter,
  getPlayer,
  updatePlayer,
  createPlayerReview
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
