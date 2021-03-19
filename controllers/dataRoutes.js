const TftQuery = require('tft-query');
// Global client settings
const useRedis = true;
const redisConfig = false;
const apiKey = require('../config');

module.exports = {
    getAllDataBySummonerName: async (req, res) => {
        try {
            const { summonerName } = req.params;
            const payload = { summonerName };
            const region = 'NA';
            const config = { region, payload, apiKey, useRedis, redisConfig };
            const client = new TftQuery(config);
            const data = await client.getAllInfoBySummonerName();
            res.status(200).send(data);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
