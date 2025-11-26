function findPeakGrid(mat: number[][]): number[] {

    for(let row = 0; row < mat.length; row += 1) {
        for(let col = 0; col < mat[0].length; col += 1) {

            const currVal = mat[row][col];

            const directions = [
                [-1, 0], // up
                [0, 1], // right
                [1, 0], // down
                [0, -1], // left
            ];

            let count = 0;
            for(const [rowDelta, colDelta] of directions) {

                const neighborRow = row + rowDelta;
                const neighborCol = col + colDelta;

                let neighborVal = -1;
                if(
                    neighborRow >= 0 && neighborRow < mat.length &&
                    neighborCol >= 0 && neighborCol < mat[0].length
                ) {
                    neighborVal = mat[neighborRow][neighborCol];
                }

                if(currVal > neighborVal) {
                    count += 1;
                }

            }
            if(count === 4) {
                return [row, col];
            }

        }
    }

    return [-1, 1];

};