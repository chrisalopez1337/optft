module.exports = {
    secondsToMinutes(seconds) {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = Math.floor(seconds - minutes * 60);
        const result = minutes.toString() + 'm ' + secondsLeft.toString() + 's';
        return result;
    }
}
