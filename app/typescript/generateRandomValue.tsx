const generateRandomValue = (() => {
    let availableIndices: number[] = [];

    return (array: any[]): number | undefined => {
        if (availableIndices.length === 0) {
            availableIndices = Array.from(array.keys());
        }

        const randomIndex = Math.floor(Math.random() * availableIndices.length);

        return availableIndices.splice(randomIndex, 1)[0];
    };
})();

export default generateRandomValue