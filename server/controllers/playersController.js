const Player = require("../models/Player");

// Create Player
const createPlayer = async (req, res) => {
  try {
    // Create a new Player
    const player = new Player({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
    });

    await player.save();
    res.status(200).json({
      message: `New Player has been Created`,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Get Players
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

// Search
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
  const total = players.result;
  const limit = 3;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  res.json({
    totalPages: Math.ceil(total / PAGE_SIZE),
    players: result.slice(startIndex, endIndex),
  });
};

module.exports = { createPlayer, getPlayers, getPlayersBySearch };

/* 
   => Create Player 
   => Get All Players (sport) 
      " To retrieve players and display them depending on sport type "
   => Get Player (:id) 
      " To get player details viewed "
   => Edit Player (:id) 
      " To update player data "

*/
