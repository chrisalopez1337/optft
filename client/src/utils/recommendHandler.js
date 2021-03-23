class RecommendHandler {
    constructor(differences) {
        this.differences = differences;
    }

    generateGoldString() {
        const { goldLeft } = this.differences;
        // First round the number
        const num = Math.floor(goldLeft);
        // Then run through area checks
        if (num < 0) {
            return 'Gold Left: Great job on not leaving much gold left when the game is over!'
        } else if (num > 0 ) {
            return 'Gold Left: On average you tend to have more gold left than your peers. Having spare gold is innevitable, but also can be a usefull resource. If you are about to die, make sure to use your gold for any extra chances!';
        }
    }

    generateAgroArray() {
        const { timeEliminated, lastRound, level } = this.differences;
        const results = [];
        const badStarter = 'Durability: You are often dropping out of the game before your peers, this can be due to a few reaons:';
        const mediumStarter = 'Durability: Although you are close to your peers in your survival rate, we think you could still improve from these core concepts:';
        const goodStarter = 'Durability: You tend to outlast most of your peers! Keep up the good work.';
        const levelMessage = 'On average you are dropping out early while haver a lower level than your peers. This is usually caused by spending to much gold rolling in the early-mid game and not spending enough on leveling up or ecoing effectively.';
        const levelMessage2 = 'On average you tend to not only die early, but die at a higher level than your peers. While leveling up is good to get more trait stats and raw units, if you dont have a good core set of 2* units this can be detrimental. 2* units are vastly stronger than 1*, as 3* as vastly stronger than 2*, try to push for these units a bit harder.';
        const timeMessage = 'Often when we dont survive very late in the game it can be due to many reasons, like using incorrect item choices, or building weak comps. We recommend looking at our tier list data to suggest what comps you may want to try!'
        const timeMessage2 = 'This can also be a direct result of ecoing to hard! If you are saving all your gold and soaking damage in the early game, even if you make it to your comp at 20hp you are likely to loose to the top players, or dont have a very good safety net. Ecoing is good, but make sure to build a decent comp early and not to tunnel vision.';
        if (timeEliminated < -5 && lastRound < -5 && level < 0) {
            results.push(badStarter);
            results.push(levelMessage);
            results.push(timeMessage);
            results.push(timeMessage2);
        } else if (timeEliminated < -5 && lastRound < -5 && level > 5) {
            results.push(badStarter);
            results.push(levelMessage2);
            results.push(timeMessage);
            results.push(timeMessage2);
        } else if (timeEliminated < -5 && lastRound < -5) {
            results.push(badStarter);
            results.push(timeMessage);
            results.push(timeMessage2);
        } else if ((timeEliminated > -5 && timeEliminated < 0) && (lastRound > -5 && lastRound < 0)) {
            results.push(mediumStarter);
            results.push(timeMessage);
            if (level < -5) {
                results.push(levelMessage);
            }

            if (level > 5) {
                results.push(levelMessage2);
            }
        } else if (timeEliminated > 5 && lastRound > 5) {
            results.push(goodStarter);
            if (level < -5) {
                results.push(levelMessage);
            }

            if (level > 5) {
                results.push(levelMessage2);
            }
        }
        return results;
    }
}

module.exports = RecommendHandler;
