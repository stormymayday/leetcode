function isValidSudoku(board: string[][]): boolean {
    // Use a Set to track all three Sudoku constraints simultaneously with unique string keys
    const hashSet = new Set();

    // Iterate through each cell in the 9x9 Sudoku board
    for(let row = 0; row < 9; row++) {
        for(let col = 0; col < 9; col++) {
            // Get the current cell value
            const currentValue = board[row][col];

            // Skip empty cells (marked with '.')
            if(currentValue === '.') {
                continue;
            }

            // Check if the current value violates any of the three Sudoku constraints:
            if(
                // 1. Check if this value already exists elsewhere in the same row
                hashSet.has(`${currentValue} in row ${row}`) ||
                
                // 2. Check if this value already exists elsewhere in the same column
                hashSet.has(`${currentValue} in col ${col}`) ||
                
                // 3. Check if this value already exists elsewhere in the same 3x3 box
                // Math.floor(row/3) and Math.floor(col/3) convert the 9x9 coordinates to 3x3 box coordinates
                // e.g., cells (0,0), (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1), (2,2) all map to box 0x0
                hashSet.has(`${currentValue} in box ${Math.floor(row/3)}x${Math.floor(col/3)}`)
            ) {
                // If any constraint is violated, the board is invalid
                return false;
            } else {
                // Otherwise, record this value's presence in its row, column, and box
                // by adding three different string keys to the Set
                hashSet.add(`${currentValue} in row ${row}`);
                hashSet.add(`${currentValue} in col ${col}`);
                hashSet.add(`${currentValue} in box ${Math.floor(row/3)}x${Math.floor(col/3)}`);
            }
        }
    }

    // If we've processed the entire board without finding any violations, the board is valid
    return true;
};