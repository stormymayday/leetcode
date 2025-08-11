function kWeakestRows(mat: number[][], k: number): number[] {
    // 1. Count one's in each row
    const onesCount = new Map<number, number>();
    for(let row = 0; row < mat.length; row += 1) {
        if(!onesCount.has(row)) {
            onesCount.set(row, 0);
        }
        for(let col = 0; col < mat[0].length; col += 1) {
            if(mat[row][col] === 1) {
                onesCount.set(row, onesCount.get(row) + 1);
            }
        }
    }

    const rowCount: number[][] = [];
    for(const [row, count] of onesCount.entries()) {
        rowCount.push([row, count]);
    }

    // sort by count (ascending)
    rowCount.sort((a, b) => a[1] - b[1]);

    const res: number[] = [];
    for(let i = 0; i < rowCount.length; i += 1) {
        res.push(rowCount[i][0])
    }

    while(res.length > k) {
        res.pop();
    }

    return res;

};