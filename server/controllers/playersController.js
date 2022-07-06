const Player = require("../models/Player");

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
  // const q = req.query.q;

  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const total = await Player.countDocuments({});

  const players = await Player.find()
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

  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");

  const players = await Player.find();

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

// *********************** Filter ************************
const getPlayersByFilter = async (req, res) => {
  let region = req.query.region;
  let sortAttribute = req.query.sortAttribute;
  let sortWay = req.query.sortWay;

  const PAGE_SIZE = 3;
  const page = parseInt(req.query.page || "0");
  const limit = 3;

  // Region Only
  if (region && sortAttribute == false && sortWay == false) {
    const players = await Player.find({ region: region });
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
      const players = await Player.find({}).sort({ rate: -1 });
      const total = players.length;

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      res.json({
        totalPages: Math.ceil(total / PAGE_SIZE),
        players: players.slice(startIndex, endIndex),
      });
    }
    if (sortAttribute == "age") {
      const players = await Player.find({}).sort({ age: -1 });
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
      const players = await Player.find({ region: region }).sort({
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
      const players = await Player.find({ region: region }).sort({
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
      const players = await Player.find().sort({
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
      const players = await Player.find().sort({
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
      const players = await Player.find().sort({
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
      const players = await Player.find().sort({
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
      const players = await Player.find({ region: region }).sort({
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
      const players = await Player.find({ region: region }).sort({
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
      const players = await Player.find({ region: region }).sort({
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
      const players = await Player.find({ region: region }).sort({
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

module.exports = {
  createPlayer,
  getPlayers,
  getPlayersBySearch,
  getPlayersByFilter,
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
