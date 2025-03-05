function isValidSudoku(board: string[][]): boolean {

    // checking columns
    for(let row = 0; row < 9; row++) {
        const rowSet = new Set();
        for(let col = 0; col < 9; col++) {
            const cell = board[row][col];
            if(cell === '.') {
                continue;
            }
            if(rowSet.has(cell)) {
                return false;
            } else {
                rowSet.add(cell);
            }
        }
    }

    // checking columns
    for(let col = 0; col < 9; col++) {
        const colSet = new Set();
        for(let row = 0; row < 9; row++) {
            const cell = board[row][col];
            if(cell === '.') {
                continue;
            }
            if(colSet.has(cell)) {
                return false;
            } else {
                colSet.add(cell);
            }
        }
    }

    // checking sub-boards
    for(let row = 0; row < 9; row+=3) {
        for(let col = 0; col < 9; col+=3) {
            const subBoardSet = new Set();
            for(let subRow = 0; subRow < 3; subRow++) {
                for(let subCol = 0; subCol <3; subCol++) {
                    const cell = board[row + subRow][col + subCol];
                    if(cell === '.') {
                        continue;
                    }
                    if(subBoardSet.has(cell)) {
                        return false;
                    } else {
                        subBoardSet.add(cell);
                    }
                }
            }
        }
    }

    return true;
    
};