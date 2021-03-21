module.exports = {
    secondsToMinutes(seconds) {
        let minutes = Math.floor(time / 60);
        let seconds = time - minutes * 60;
        const result = minutes.toString() + 'm ' + seconds.toString() + 's';
        return result;
    }
}
