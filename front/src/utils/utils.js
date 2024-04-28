export function formatDate(elapsedTime) {
    const formatTimeUnit = (unit) => unit.toString().padStart(2, '0');
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const formatted = `${formatTimeUnit(minutes)}:${formatTimeUnit(seconds)}`;

    return formatted;
}