function solveNQueens(n: number): string[][] {
    const res: string[][] = [];
    const board: string[][] = new Array(n);
    for(let i = 0; i < n; i += 1) {
        board[i] = new Array(n).fill('.');
    }
    const colSet = new Set<number>();
    const posDiagSet = new Set<number>(); // row + col
    const negDiagSet = new Set<number>(); // row - col
    function helper(row: number):void {
        if(row === n) {
            res.push(board.map((row) => row.join("")));
            return;
        }
        for(let col = 0; col < n; col += 1) {
            if(!colSet.has(col) && !posDiagSet.has(row + col) && !negDiagSet.has(row - col)) {
                board[row][col] = 'Q';
                colSet.add(col);
                posDiagSet.add(row + col);
                negDiagSet.add(row - col);

                helper(row + 1);

                board[row][col] = '.';
                colSet.delete(col);
                posDiagSet.delete(row + col);
                negDiagSet.delete(row - col);


            }
        }
    }
    helper(0);
    return res;
};