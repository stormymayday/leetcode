function spiralOrder(matrix: number[][]): number[] {

    const res = [];

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let leftBound = 0;
    let rightBound = COLS - 1;
    let topBound = 0;
    let botBound = ROWS - 1;

    // this
    while (leftBound <= rightBound && topBound <= botBound) {

        // Reading Top Row (from leftBound up to rightBound)
        for (let col = leftBound; col <= rightBound; col += 1) {
            res.push(matrix[topBound][col]);
        }
        // Moving topBound down
        topBound += 1;

        // Reading Right Col (from topBound up to botBound)
        for (let row = topBound; row <= botBound; row += 1) {
            res.push(matrix[row][rightBound]);
        }
        // Moving rightBound to the left
        rightBound -= 1;

        // Now Pointers could have crossed
        if (leftBound > rightBound || topBound > botBound) {
            break;
        }

        // Reading Bot Row (from rightBound up leftBound)
        for (let col = rightBound; col >= leftBound; col -= 1) {
            res.push(matrix[botBound][col]);
        }
        // Moving botBound up
        botBound -= 1;

        // Left Col (from botBound up to but not topBound)
        for (let row = botBound; row >= topBound; row -= 1) {
            res.push(matrix[row][leftBound]);
        }
        // Moving leftBound to the right
        leftBound += 1;

    }

    return res;

};