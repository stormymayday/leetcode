function solveNQueens(n: number): string[][] {
    const colSet = new Set<number>();
    const posDiagSet = new Set<number>();
    const negDiagSet = new Set<number>();
    const result: string[][] = [];
    const board: string[][] = [];
    for(let i = 0; i < n; i += 1) {
        board[i] = new Array(n).fill('.');
    }
    function helper(row: number): void {
        if(row === n) {
            result.push(board.map(row => row.join('')));
            return;
        }
        for(let col = 0; col < n; col += 1) {
            if(!colSet.has(col) && !posDiagSet.has(row + col) && !negDiagSet.has(row - col)) {
                // Choose this position
                colSet.add(col);
                posDiagSet.add(row + col);
                negDiagSet.add(row - col);
                board[row][col] = 'Q';

                // Explore with this position
                helper(row + 1);

                // Backtrack
                colSet.delete(col);
                posDiagSet.delete(row + col);
                negDiagSet.delete(row - col);
                board[row][col] = '.';

            }
        }
    }
    helper(0);
    return result;
};