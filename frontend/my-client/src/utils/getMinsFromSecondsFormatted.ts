const getMinsFromSecondsFormatted = (rawSeconds?: number) => {
    if (!rawSeconds) return '0:00';
    const flooredSeconds = Math.floor(rawSeconds);
    const minutes = Math.floor(flooredSeconds / 60);
    const seconds = flooredSeconds - minutes * 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export default getMinsFromSecondsFormatted;
