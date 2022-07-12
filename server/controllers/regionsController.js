const Region = require("../models/Region");

//get sports

const getRegions = async (req, res) => {
    const Regions=await Region.find();
    res.send(Regions);

};

module.exports = { getRegions};

