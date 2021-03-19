const TftQuery = require('tft-query');
const apiKey = require('../config');
module.exports = {
    getAllDataBySummonerName: async (req, res) => {
        try {
            const { summonerName } = req.params;
            const payload = { summonerName };
            const config = { 'NA', payload, apiKey, true, false };
            const client = new TftQuery(config);
            const data = await getAllInfoBySummonerName();
            res.status(200).send(data);
        } catch(err) {
            console.log(err);
            res.sendStatus(500);
        }
    }
}
