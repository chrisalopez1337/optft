class DataAnalysis {
    constructor(allData) {
        const { allMatchInfo, puuid } = allData;
        this.allData = allData;
        this.matchData = allMatchInfo;
        this.allGames = [];
        this.playersPuuid = puuid;
    }

    getSingleMatchData(gameInfo) {
        // Set result objects
        const game = {
            metadata: {
                participants: [],
                match_id: '',
                game_date: 0,
                game_length: 0,
            },

            averageGoldLeft: 0,
            averageLastRound: 0,
            averageLevel: 0,
            averagePlayersEliminated: 0,
            averageTimeEliminated: 0,
            averageDamageToPlayers: 0,
            averageTraits: {},
            averageUnits: {},
        };
        // Store the individual players data
        const player = {
            goldLeft: 0,
            lastRound: 0,
            level: 0,
            playersEliminated: 0,
            timeEliminated: 0,
            damageToPlayers: 0,
            traits: {},
            units: {},
        }

        // Get raw data from the game info.
        const { metadata, info } = gameInfo;

        // Store the metadata info to the single game
        game.metadata.participants = metadata.participants;
        game.metadata.match_id = metadata.match_id;
        game.metadata.game_date = info.game_datetime;
        game.metadata.game_length = info.game_length;

        // Get the non-meta data from the game
        const { participants } = info;
        
    }
}

module.exports = DataAnalysis;
