function isValidSudoku(board: string[][]): boolean {
    const rowsMap = new Map<number, Set<string>>();
    const colsMap = new Map<number, Set<string>>();
    const subGridsMap = new Map<string, Set<string>>(); // the key is `${Math.floor(row/3)},${Math.floor(col/3)}`
    for(let i = 0; i < 9; i += 1) {
        rowsMap.set(i, new Set<string>());
        colsMap.set(i, new Set<string>());
    }
    for(let r = 0; r < 3; r += 1) {
        for(let c = 0; c < 3; c += 1) {
            subGridsMap.set(`${r},${c}`, new Set<string>());
        }
    }
    for(let row = 0; row < 9; row += 1) {
        for(let col = 0; col < 9; col += 1) {
            if(board[row][col] !== '.') {
                const currentVal: string = board[row][col];
                if(
                    !rowsMap.get(row).has(currentVal) &&
                    !colsMap.get(col).has(currentVal) &&
                    !subGridsMap.get(`${Math.floor(row/3)},${Math.floor(col/3)}`).has(currentVal)
                    ) {
                        rowsMap.get(row).add(currentVal);
                        colsMap.get(col).add(currentVal);
                        subGridsMap.get(`${Math.floor(row/3)},${Math.floor(col/3)}`).add(currentVal);
                } else {
                    return false;
                }
            }
        }
    }
    return true;
};