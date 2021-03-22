module.exports = {
    percentageCreator(number) {
        if (isNaN(number) || number === 0) {
            return { type: null, string: '0.00%' };
        }
        let result = { type: null, string: ''};
        // First define if its a negative or positive
        if (number < 0) {
            result.type = 'negative';
        } else {
            result.type = 'positive';
        }
        // Then format the string
        if (result.type === 'positive') {
            result.string = '+' + number.toFixed(2).toString() + '%';
        } else {
            result.string = number.toFixed(2).toString() + '%';
            
        }
        return result;
    }
}
