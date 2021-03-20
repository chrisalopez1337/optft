class DataAnalysis {
    constructor(allData) {
        const { allMatchInfo, puuid } = allData;
        this.allData = allData;
        this.matchData = allMatchInfo;
        this.allGames = [];
        this.playerSearchedPuuid = puuid;
        this.gameUnitData = {};
    }

    getMainTrait(traitData) {
        // Tier current should be the amount of units they have at the end of the game.
        let mainTrait = { name: '', rank: 0 };
        // loop over every trait
        for (let i = 0; i < traitData.length; i++) {
            const trait = taitData[i];
            const { name, tier_current } = trait;
            if (mainTrait.rank < tier_current) {
                mainTrait.name = name;
                mainTrait.rank = tier_current;
            }
        }
        return mainTrait;
    }

    accumulateItemsCount(newItems, oldItems = {}) {
        // Loop over each item and add it to the items
        for (let i = 0; i < newItems.length; i++) {
            const item = newItems[i];
            // Check if that item has been tracked yet
            if (!oldItems[item]) {
                oldItems[item] = 1;
            } else {
                oldItems[item]++;
            }
        }
        return oldItems;
    }
    
    accumulateUnitData(unitData, startingData = this.gameUnitData) {
        // Loop over each unit and accumulate it
        for (let i = 0; i < unitData.length; i++) {
            const unit = unitData[i];
            // Pull data out of unit
            const { character_id, items, rarity, tier } = unit; 
            // Check if the unit already exists in the map
            if (!startingData[character_id]) {
                startingData[character_id] = {
                    count: 1,
                    itemsCount: 
                }
            }
        }
    }

    getSingleMatchData(gameInfo) {
        // Set result objects
        const overall = {
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
            playersTraits: {},
            playersUnits: {},
        };
        // Store the individual players data
        const player = {
            placement: 0,
            goldLeft: 0,
            lastRound: 0,
            level: 0,
            playersEliminated: 0,
            timeEliminated: 0,
            damageToPlayers: 0,
            mainTrait: {},
        }

        // Get raw data from the game info.
        const { metadata, info } = gameInfo;

        // Store the metadata info to the single game
        overall.metadata.participants = metadata.participants;
        overall.metadata.match_id = metadata.match_id;
        overall.metadata.game_date = info.game_datetime;
        overall.metadata.game_length = info.game_length;

        // Get the non-meta data from the game
        const { participants } = info;
        
        // Loop over every participant
        for (let i = 0; i < participants.length; i++) {
            const participant = participants[i];
            const { gold_left, last_round, level, placement, players_eliminated, puuid, time_eliminated, total_damage_to_players, traits } = participant;
            // At this point I may want to store a reformatted object with the usefull data for each player and then save it to the database.
            // Check if the player we are looking at is the player being searched.
            if (this.playerSearchedPuuid === puuid) {
                // Store that single players data
                player.placement = placement;
                player.goldLeft = gold_left;
                player.lastRound = last_round;
                player.level = level;
                player.playersEliminated = players_eliminated;
                player.timeEliminated = time_eliminated;
                player.damageToPlayers = total_damage_to_players;
                player.mainTrait = this.getMainTrait(traits);
            }

            // Add up overall data
            overall.averageGoldLeft += gold_left;
            overall.averageLastRound += last_round;
            overall.averageLevel += level;
            overall.averagePlayersEliminated += players_eliminated;
            overall.averageTimeEliminated += time_eliminated;
            overall.averageDamageToPlayers += total_damage_to_players;
            overall.playersTraits[puuid] = this.getMainTrait(traits);
            overall.playersUnits = 
        }
    }
}

module.exports = DataAnalysis;
