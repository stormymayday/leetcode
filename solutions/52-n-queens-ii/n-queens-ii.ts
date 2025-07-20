function totalNQueens(n: number): number {
    const colSet = new Set<number>();
    const negDiagSet = new Set<number>();
    const posDiagSet = new Set<number>();
    let result = 0;
    function helper(row: number):void {
        if(row === n) {
            result += 1;
            return;
        }
        for(let col = 0; col < n; col += 1) {
            if(
                !colSet.has(col) &&
                !negDiagSet.has(row - col) &&
                !posDiagSet.has(row + col)
            ) {
                colSet.add(col);
                negDiagSet.add(row - col);
                posDiagSet.add(row + col);

                helper(row + 1);

                colSet.delete(col);
                negDiagSet.delete(row - col);
                posDiagSet.delete(row + col);

            }
        }
    }
    helper(0);
    return result;
};