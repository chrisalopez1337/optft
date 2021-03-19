const TftQuery = require('tft-query');
// Global client settings
const useRedis = true;
const redisConfig = false;
const apiKey = require('../config');

module.exports = {
    getAllDataBySummonerName: async (req, res) => {
        try {
            const { summonerName } = req.params;
            // Data for client
            const payload = { summonerName };
            const region = 'NA'; // This will be dynamic later. 
            const config = { region, payload, apiKey, useRedis, redisConfig };
            // Create client with information
            const client = new TftQuery(config);
            const response = await client.getAllInfoBySummonerName();
            // Return clients response
            res.status(200).send(response);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
