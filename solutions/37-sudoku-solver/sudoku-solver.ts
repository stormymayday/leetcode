/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
    // 1. Setting up the Hash Maps
    const rowsMap = new Map<number, Set<string>>();
    const colsMap = new Map<number, Set<string>>();
    const subGridsMap = new Map<string, Set<string>>();
    for(let i = 0; i < 9; i += 1) {
        rowsMap.set(i, new Set());
        colsMap.set(i, new Set());
    }
    for(let i = 0; i < 3; i += 1) {
        for(let j = 0; j < 3; j += 1) {
            subGridsMap.set(`${i},${j}`, new Set());
        }
    }
    // 2. Filling up the Hash Maps
    for(let row = 0; row < 9; row += 1) {
        for(let col = 0; col < 9; col += 1) {
            if(board[row][col] !== '.') {
                const val = board[row][col];
                rowsMap.get(row).add(val);
                colsMap.get(col).add(val);
                const subGrid = `${Math.floor(row/3)},${Math.floor(col/3)}`;
                subGridsMap.get(subGrid).add(val);
            }
        }
    }

    function helper(row: number, col: number): boolean {
        if(row === 9) {
            return true;
        } 
        if(col === 9) {
            return helper(row + 1, 0);
        }
        if(board[row][col] !== '.') {
            return helper(row, col + 1);
        }
        for(let i = 1; i <= 9; i += 1) {
            const num = `${i}`;
            const subGrid = `${Math.floor(row/3)},${Math.floor(col/3)}`;
            if(
                !rowsMap.get(row).has(num) &&
                !colsMap.get(col).has(num) &&
                !subGridsMap.get(subGrid).has(num)
            ) {

                board[row][col] = num;
                rowsMap.get(row).add(num);
                colsMap.get(col).add(num);
                subGridsMap.get(subGrid).add(num);

                if(helper(row, col + 1) === true) {
                    return true;
                }

                board[row][col] = '.';
                rowsMap.get(row).delete(num);
                colsMap.get(col).delete(num);
                subGridsMap.get(subGrid).delete(num);

            }
        }
        return false;
    }

    helper(0, 0);

};