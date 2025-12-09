function spiralOrder(matrix: number[][]): number[] {

    const res = [];

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let leftBound = 0;
    let rightBound = COLS - 1;
    let topBound = 0;
    let botBound = ROWS - 1;

    // Iterate until Left & Right AND Top & Bottom have not crossed
    while (leftBound <= rightBound && topBound <= botBound) {

        // Reading Top Row (from leftBound up to rightBound)
        for (let col = leftBound; col <= rightBound; col += 1) {
            res.push(matrix[topBound][col]);
        }
        // Moving topBound down (Folding Top)
        topBound += 1; // Top can now cross Bottom!

        // Reading Right Col (from topBound up to botBound)
        // Note: If Top crosses Bottom, this loop will not execute!
        for (let row = topBound; row <= botBound; row += 1) {
            res.push(matrix[row][rightBound]);
        }
        // Moving rightBound to the left (Folding Right)
        rightBound -= 1; // Right can now cross Left!

        // Check if any pointers have crossed!
        if (leftBound > rightBound || topBound > botBound) {
            break;
        }

        // Reading Bot Row (from rightBound up leftBound)
        for (let col = rightBound; col >= leftBound; col -= 1) {
            res.push(matrix[botBound][col]);
        }
        // Moving botBound up (Folding Bottom)
        botBound -= 1; // Bottom can now cross Top

        // Left Col (from botBound up to but not topBound)
        for (let row = botBound; row >= topBound; row -= 1) {
            res.push(matrix[row][leftBound]);
        }
        // Moving leftBound to the right (Folding Left)
        leftBound += 1; // Left can now cross Right

    }

    return res;

};