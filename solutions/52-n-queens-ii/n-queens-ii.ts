function totalNQueens(n: number): number {
    const colSet = new Set<number>();
    const posDiagSet = new Set<number>();
    const negDiagSet = new Set<number>();
    let result = 0;
    function helper(row: number): void {
        if(row === n) {
            result += 1;
            return;
        }
        for(let col = 0; col < n; col += 1) {
            if(!colSet.has(col) && !posDiagSet.has(row + col) && !negDiagSet.has(row - col)) {
                // Choose this position
                colSet.add(col);
                posDiagSet.add(row + col);
                negDiagSet.add(row - col);

                // Explore with this position
                helper(row + 1);

                // Backtrack
                colSet.delete(col);
                posDiagSet.delete(row + col);
                negDiagSet.delete(row - col);
            }
        }
    }
    helper(0);
    return result;
};