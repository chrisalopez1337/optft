class DataAnalysis {
    constructor(allData) {
        const { allMatchInfo, puuid } = allData;
        this.allData = allData;
        this.matchData = allMatchInfo;
        this.allGames = [];
        this.playerSearchedPuuid = puuid;
        this.gameUnitData = {};
    }

    /* _____________________ MATH HELPERS ______________________ */
    getAverage(num, divider, floor = false) {
        if (floor) {
            return Math.floor(num / divider);
        } else {
            return num / divider;
        }
    }

    getDifferenceInPercentage(oldNumber, newNumber) {
        const decreaseValue = oldNumber - newNumber;
        return (decreaseValue / oldNumber) * 100;
    }
    /* _________________________________________________________ */

    /* Info: Gets the trait with the highest number of units for a single participants trait array
     * Params
     * @traitData: Array
     * Returns 
     * @mainTrait: { name: String, rank: Integer }
     */
    getMainTrait(traitData) {
        // Tier current should be the amount of units they have at the end of the game.
        let mainTrait = { name: '', rank: 0 };
        // loop over every trait
        for (let i = 0; i < traitData.length; i++) {
            const trait = traitData[i];
            const { name, num_units } = trait;
            if (mainTrait.rank < num_units) {
                mainTrait.name = name;
                mainTrait.rank = num_units;
            }
        }
        return mainTrait;
    }

    /* Info: Takes in an object of items with the count of how many times they have been used, and then accumulates that given a new items array
     * Params
     * @newItems: Array
     * @oldItems: Object
     * Returns 
     * @oldItems: { itemId: numOfTimesUsed<Integer> }
     */
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

    /* Info: Takes in an array of unitData and the overall unit data for a game, accumulated the amount of times a single unit is seen as well as how often certain items are built onto that unit
     * Params
     * @unitData: Array
     * @startingData: Object
     * Returns 
     * @gameUnitData: { unit_name: { count: <Integer>, itemsCount: { itemId: count<Integer, ... } } };
     */
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
                    itemsCount: this.accumulateItemsCount(items),
                }
            } else {
                startingData[character_id].count++;
                startingData[character_id].itemsCount = this.accumulateItemsCount(items, startingData[character_id].itemsCount);
            }
        }
        this.gameUnitData = startingData;
        return this.gameUnitData;
    }

    /* Info: Accumulates complete game data for a single match, and then returns the searched players info, the average of all players in that match, as well as the differential in that single match
     * Params
     * @gameInfo: Array (Single match info)
     * Returns 
     * @Object: { overall: [Object], player: [Object], difference: [Object] }
     */
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
            const { gold_left, last_round, level, placement, players_eliminated, puuid, time_eliminated, total_damage_to_players, traits, units } = participant;
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
            overall.playersUnits = this.accumulateUnitData(units, this.gameUnitData); 
        }

        // Then get the averages for each section
        overall.averageGoldLeft = this.getAverage(overall.averageGoldLeft, 8, true);
        overall.averageLastRound = this.getAverage(overall.averageLastRound, 8, true);
        overall.averageLevel = this.getAverage(overall.averageLevel, 8, true);
        overall.averagePlayersEliminated = this.getAverage(overall.averageLevel, 8, true);
        overall.averageTimeEliminated = this.getAverage(overall.averageTimeEliminated, 8, true);
        overall.averageDamageToPlayers = this.getAverage(overall.averageDamageToPlayers, 8, true);

        // Now get the percentage difference for the player vs the lobby
        const difference = {
            goldLeft: 0,
            lastRound: 0,
            level: 0,
            playersEliminated: 0,
            timeEliminated: 0,
            damageToPlayers: 0,
        }
        difference.goldLeft = this.getDifferenceInPercentage(player.goldLeft, overall.averageGoldLeft);
        difference.lastRound = this.getDifferenceInPercentage(player.lastRound, overall.averageLastRound);
        difference.level = this.getDifferenceInPercentage(player.level, overall.averageLevel);
        difference.playersEliminated = this.getDifferenceInPercentage(player.playersEliminated, overall.averagePlayersEliminated);
        difference.timeEliminated = this.getDifferenceInPercentage(player.timeEliminated, overall.averageTimeEliminated);
        difference.damageToPlayers = this.getDifferenceInPercentage(player.damageToPlayers, overall.averageDamageToPlayers);

        this.allGames.push({ player, overall, difference });
        return { player, overall, difference };
    }


    getOverallAverage() {
        // store results
        const playerAverages = {
            goldLeft: 0,
            lastRound: 0,
            level: 0,
            playersEliminated: 0,
            timeEliminated: 0,
            damageToPlayers: 0,
        };

        const overallAverages = {
            averageGoldLeft: 0,
            averageLastRound: 0,
            averageLevel: 0,
            averagePlayersEliminated: 0,
            averageTimeEliminated: 0,
            averageDamageToPlayers: 0,
            playersTraits: {},
            playersUnits: {},
        };

        const overallDifference = {
            goldLeft: 0,
            lastRound: 0,
            level: 0,
            playersEliminated: 0,
            timeEliminated: 0,
            damageToPlayers: 0,
        };

        // Loop over every game
        for (const key in this.matchData) {
            const game = this.matchData[key];
            // Get a singular response from a game
            const { player, overall } = this.getSingleMatchData(game);
            
            // Accumulate that data to our averages for the player 
            playerAverages.goldLeft += player.goldLeft;
            playerAverages.lastRound += player.lastRound;
            playerAverages.level += player.level;
            playerAverages.playersEliminated += player.playersEliminated;
            playerAverages.timeEliminated += player.timeEliminated;
            playerAverages.damageToPlayers += player.damageToPlayers;
            // Either need to write a seperate function to collect unit/trait/item data or refactor the existing ones to support accumulation.

            // Accumulate that data to our averages for the overall
            overallAverages.averageGoldLeft += overall.averageGoldLeft;
            overallAverages.averageLastRound += overall.averageLastRound;
            overallAverages.averageLevel += overall.averageLevel;
            overallAverages.averagePlayersEliminated += overall.averagePlayersEliminated;
            overallAverages.averageTimeEliminated += overall.averageTimeEliminated;
            overallAverages.averageDamageToPlayers += overall.averageDamageToPlayers;
            // Either need to write a seperate function to collect unit/trait/item data or refactor the existing ones to support accumulation.
        }

        // Collect averages and then get the differences
        const divider = this.allGames.length;

        // Single player averaging
        playerAverages.goldLeft = this.getAverage(playerAverages.goldLeft, divider, true);
        playerAverages.lastRound = this.getAverage(playerAverages.lastRound, divider, true);
        playerAverages.level = this.getAverage(playerAverages.level, divider, true);
        playerAverages.playersEliminated = this.getAverage(playerAverages.playersEliminated, divider, true);
        playerAverages.timeEliminated = this.getAverage(playerAverages.timeEliminated, divider);
        playerAverages.damageToPlayers = this.getAverage(playerAverages.damageToPlayers, divider, true);

        // Overall averaging
        overallAverages.averageGoldLeft = this.getAverage(overallAverages.averageGoldLeft, divider, true);
        overallAverages.averageLastRound = this.getAverage(overallAverages.averageLastRound, divider, true);
        overallAverages.averageLevel = this.getAverage(overallAverages.averageLevel, divider, true);
        overallAverages.averagePlayersEliminated = this.getAverage(overallAverages.averagePlayersEliminated, divider, true);
        overallAverages.averageTimeEliminated = this.getAverage(overallAverages.averageTimeEliminated, divider);
        overallAverages.averageDamageToPlayers = this.getAverage(overallAverages.averageDamageToPlayers, divider, true);

        // Calculate the difference in percentage
        overallDifference.goldLeft = this.getDifferenceInPercentage(playerAverages.goldLeft, overallAverages.averageGoldLeft);
        overallDifference.lastRound = this.getDifferenceInPercentage(playerAverages.lastRound, overallAverages.averageLastRound);
        overallDifference.level = this.getDifferenceInPercentage(playerAverages.level, overallAverages.averageLevel);
        overallDifference.playersEliminated = this.getDifferenceInPercentage(playerAverages.playersEliminated, overallAverages.averagePlayersEliminated);
        overallDifference.timeEliminated = this.getDifferenceInPercentage(playerAverages.timeEliminated, overallAverages.averageTimeEliminated);
        overallDifference.damageToPlayers = this.getDifferenceInPercentage(playerAverages.damageToPlayers, overallAverages.averageDamageToPlayers);

        return { playerAverages, overallAverages, overallDifference };
    }
}

module.exports = DataAnalysis;
