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

    generateAgro() {
        const { timeEliminated, lastRound, level } = this.differences;
        let message;
        const badStarter = 'Durability: You are often dropping out of the game before your peers, this can be due to a few reaons:';
        const mediumStarter = 'Durability: Although you are close to your peers in your survival rate, we think you could still improve from these core concepts:';
        const goodStarter = 'Durability: You tend to outlast most of your peers! Keep up the good work.';
        if (timeEliminated < -5 && lastRound < -5 && level < 0) {
            message = ''
        }
    }
}

module.exports = RecommendHandler;
