function isValidSudoku(board: string[][]): boolean {

    const rowMap = new Map<number, Set<string>>(); // key: row ind, val: set of row vals
    const colMap = new Map<number, Set<string>>(); // key: col idx, val: set of col vals
    const subGridMap = new Map<string, Set<string>>(); // key: "row//3,col//3", val: set of sub grid vals

    for (let row = 0; row < 9; row += 1) {

        if (!rowMap.has(row)) {
            // Creating a new rowMap entry
            rowMap.set(row, new Set<string>);
        }

        for (let col = 0; col < 9; col += 1) {

            const currVal = board[row][col];
            if(currVal === '.') {
                continue;
            }

            // 1. Row Map Check
            if(rowMap.get(row).has(currVal)) {
                return false;
            }
            rowMap.get(row).add(currVal);

            if (!colMap.has(col)) {
                // Creating a new colMap entry
                colMap.set(col, new Set<string>);
            }

            // 2. Col Map Check
            if(colMap.get(col).has(currVal)) {
                return false;
            }
            colMap.get(col).add(currVal);

            const subGridKey = `${Math.floor(row/3)},${Math.floor(col/3)}`;
            if(!subGridMap.has(subGridKey)) {
                // Creating a new subGrid entry
                subGridMap.set(subGridKey, new Set<string>);
            }

            // 3 Sub-Grid Map Check
            if(subGridMap.get(subGridKey).has(currVal)) {
                return false;
            }
            subGridMap.get(subGridKey).add(currVal);

        }
    }

    return true;

};