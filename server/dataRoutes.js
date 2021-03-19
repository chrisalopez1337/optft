const express = require('express');
const dataRoutes = express.Router();
const controllers = require('../controllers/dataRoutes.js'); // Should probably change to dataControllers

dataRoutes.get('/summoner/by-name/:summonerName/all', controllers.getAllDataBySummonerName);

module.exports = dataRoutes;
