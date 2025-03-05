function isValidSudoku(board: string[][]): boolean {

    // key is a row number, value is a set of row values
    const rowMap = new Map();

    // key is a col number, value is a set of col values
    const colMap = new Map();

    // key is [(Math.floor(row/3)), (Math.floor(col/3)], value os a set of sub square values
    const subSquareMap = new Map();

    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {

            // extracting value from the current board cell
            const value = board[row][col];

            // if value is empty (dot)
            if(value === '.') {
                // skip to the next iteration
                continue;
            }

            // getting key for current sub square
            const subSquareKey = `${Math.floor(row/3)},${Math.floor(col/3)}`;

            // Initialize sets if they don't exist
            if(!rowMap.has(row)) {
                rowMap.set(row, new Set());
            }
            if(!colMap.has(col)) {
                colMap.set(col, new Set());
            }
            if(!subSquareMap.has(subSquareKey)) {
                subSquareMap.set(subSquareKey, new Set());
            }

            // checking if he have found duplicate
            if(rowMap.get(row).has(value) || colMap.get(col).has(value) || subSquareMap.get(subSquareKey).has(value)) {
                return false;
            }

            // adding value to the sets
            rowMap.get(row).add(value);
            colMap.get(col).add(value) 
            subSquareMap.get(subSquareKey).add(value)

        }
    }

    // No duplicates were found, valid board
    return true;
};