function solveNQueens(n: number): string[][] {
    const colSet = new Set<number>();
    const negDiagSet = new Set<number>(); // row - col
    const posDiagSet = new Set<number>(); // row + col
    const res: string[][] = [];
    const board: string[][] = [];
    for(let i = 0; i < n; i += 1) {
        board[i] = new Array(n).fill('.');
    }
    function helper(row: number): void {
        if(row === n) {
            res.push(board.map((row) => row.join("")));
            return;
        }
        for(let col = 0; col < n; col += 1) {
            if(
                !colSet.has(col) &&
                !negDiagSet.has(row - col) &&
                !posDiagSet.has(row + col)
            ) {
                board[row][col] = 'Q';
                colSet.add(col);
                negDiagSet.add(row - col);
                posDiagSet.add(row + col);

                helper(row + 1);

                board[row][col] = '.';
                colSet.delete(col);
                negDiagSet.delete(row - col);
                posDiagSet.delete(row + col);

            }
        }
    }
    helper(0);
    return res;
};