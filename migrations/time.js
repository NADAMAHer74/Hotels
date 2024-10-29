function getCurrentTimestamp() {
    const now = new Date();
    // Add 3 hours (in milliseconds) to the current time
    const egyptTime = new Date(now.getTime() + (3 * 60 * 60 * 1000));
    return egyptTime.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = getCurrentTimestamp;