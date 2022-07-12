const Sport = require("../models/Sport");

//get sports

const getSports = async (req, res) => {
    const sports=await Sport.find();
    res.send(sports);

};

module.exports = { getSports};

