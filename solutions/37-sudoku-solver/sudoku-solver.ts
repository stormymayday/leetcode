/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    // key is number from 0-8, value is a set of strings from 1-9
    const rowsMap = new Map<number, Set<string>>();
    const colsMap = new Map<number, Set<string>>();
    // key is a string of `${Math.floor(row/3)},${Math.floor(col/3)}`, value is a set of strings 1-9
    const subGridsMap = new Map<string, Set<string>>();
    
    // Initialize all maps with empty sets
    for(let i = 0; i < 9; i++) {
        rowsMap.set(i, new Set<string>());
        colsMap.set(i, new Set<string>());
    }
    for(let r = 0; r < 3; r++) {
        for(let c = 0; c < 3; c++) {
            subGridsMap.set(`${r},${c}`, new Set<string>());
        }
    }
    
    // Populate maps with existing values
    for(let row = 0; row < board.length; row += 1) {
        for(let col = 0; col < board[0].length; col += 1) {
            if(board[row][col] !== '.') {
                const value = board[row][col];
                rowsMap.get(row)!.add(value);
                colsMap.get(col)!.add(value);
                const subGrid = `${Math.floor(row/3)},${Math.floor(col/3)}`;
                subGridsMap.get(subGrid)!.add(value);
            }
        }
    }

    function helper(r: number, c: number):boolean {
        
        // Found the solution!
        if(r === 9) {
            return true;
        }

        // Move to next row if the column is out of bounds
        if(c === 9) {
            return helper(r + 1, 0);
        }

        // If cell is already filled, move to next column
        if(board[r][c] !== '.') {
            return helper(r, c + 1);
        }

        // Try numbers 1-9 for an empty cell
        for(let i = 1; i <= 9; i += 1) {
            const num = `${i}`;
            const subGrid = `${Math.floor(r/3)},${Math.floor(c/3)}`;
            if(
                !rowsMap.get(r).has(num) &&
                !colsMap.get(c).has(num) &&
                !subGridsMap.get(subGrid).has(num)
                ) {
                // Choose this value
                board[r][c] = num;
                rowsMap.get(r).add(num);
                colsMap.get(c).add(num);
                subGridsMap.get(subGrid).add(num);

                // Explore
                if(helper(r, c + 1) === true) {
                    return true;
                }

                // Backtrack
                board[r][c] = '.';
                rowsMap.get(r).delete(num);
                colsMap.get(c).delete(num);
                subGridsMap.get(subGrid).delete(num);

            }
        }

        return false;

    }

    helper(0, 0);
    
};