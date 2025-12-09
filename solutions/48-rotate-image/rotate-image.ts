/**
 Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix: number[][]): void {

    const n = matrix.length;

    // Boundaries
    let leftBound = 0;
    let rightBound = matrix[0].length - 1;
    let topBound = 0;
    let botBound = matrix.length - 1;

    while(leftBound < rightBound || topBound < botBound) {

        for(let i = leftBound; i < rightBound; i += 1) {
            
            // Cache Right Col Val
            const rightColVal = matrix[i][rightBound];
            // (dynamic row) Right Col <- Top Row (dynamic col)
            matrix[i][rightBound] = matrix[topBound][i];

            // Cache Bot Row Val
            const botRowVal = matrix[botBound][n - 1 - i];
            // Bot Row (dynamic col) <- (dynamic row) Right Col
            matrix[botBound][n - 1 - i] = rightColVal;

            // Cache Left Col Val
            const leftColVal = matrix[n - 1 - i][leftBound];
            // Bot Row -> Left Col
            // (dynamic row) Left Col <- Bot Row (dynamic col)
            matrix[n - 1 - i][leftBound] = botRowVal;

            // Top Row (dynamic Col) <- (dynamic row) Left Col
            matrix[topBound][i] = leftColVal;

        }

        // Constricting the bounds
        leftBound += 1;
        rightBound -= 1;
        topBound += 1;
        botBound -= 1;

    }

};