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
}

module.exports = RecommendHandler;
