const Player = require("../models/Player");

const {schema}=require("../middleware/PlayerAuth");
const multer  = require('multer')




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

  // const keys = ["name"];

  // const search = (data) => {
  //   return data.filter((item) =>
  //     keys.some((key) => item[key].toLowerCase().includes(q))
  //   );
  // };

  // console.log(search(players));

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

  const total = players.length;

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
  const playerId = req.params.id;
  const playerid=await Player.findById(req.params.id)
  res.send(playerid);

};
const updatePlayer=async (req,res)=>{









  console.log("up")
  console.log(req.file)
  console.log(req.params.id)
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
    const my_sports=req.body.sports;
    console.log("sports");
    console.log(my_sports)
    sports_arr=my_sports.split(',');
    //console.log("ibsgjfnmdc mcmndmndmncdfdc,dnfkldjlkfjlkdfmf");



    console.log("storage")
    //console.log(storage);




    if(!value.error){
    const player1= await Player.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
    if (req.file){
      const inserted_image=req.file.path;
      console.log(inserted_image)


      const playerimg=await Player.findByIdAndUpdate(req.params.id,{img:inserted_image},{new:true,runValidators:true});

    }
      const playersports=await Player.findByIdAndUpdate(req.params.id,{sports:sports_arr},{new:true,runValidators:true});
      res.send(playersports);
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

module.exports = { createPlayer, getPlayers, getPlayersBySearch,getPlayer,updatePlayer };

/*
   => Create Player
   => Get All Players (sport)
      " To retrieve players and display them depending on sport type "
   => Get Player (:id)
      " To get player details viewed "
   => Edit Player (:id)
      " To update player data "

*/
