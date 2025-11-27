function matrixMedian(grid: number[][]): number {

    const flattenedMatrix: number[] = [];

    for(let i = 0; i < grid.length; i += 1) {
        for(let j = 0; j < grid[i].length; j += 1) {
            flattenedMatrix.push(grid[i][j]);
        }
    }

    flattenedMatrix.sort((a, b) => a - b);

    return flattenedMatrix[Math.floor(flattenedMatrix.length / 2)];
};