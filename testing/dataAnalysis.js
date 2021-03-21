const axios = require('axios')
const DataAnalysis = require('../client/src/utils/dataHandler.js');
const { expect } = require('chai');
const assert = require('assert');

describe('Data Analysis Script', async () => {
    it('Should be able to analyze a singles games data', async () => {
        const { data } = await axios.get('http://localhost:1337/api/data/summoner/by-name/scarra/all');
        const analysis = new DataAnalysis(data);
        const singleGame = analysis.matchData.game1;
        const result = analysis.getSingleMatchData(singleGame);
    });
    it('Should be able to analyze a singles games data', async () => {
        const { data } = await axios.get('http://localhost:1337/api/data/summoner/by-name/scarra/all');
        const analysis = new DataAnalysis(data);
        const result = analysis.getOverallAverage();
        console.log(result.overallAverages);
    });
});
