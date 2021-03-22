module.exports = {
    percentageCreator(number) {
        let result = { type: null, string: ''};
        // First define if its a negative or positive
        if (number < 0) {
            result.type = 'negative';
        } else {
            result.type = 'positive';
        }
        // Then format the string
        result.string = number.toFixed(2).toString() + '%';
        return result;
    }
}
