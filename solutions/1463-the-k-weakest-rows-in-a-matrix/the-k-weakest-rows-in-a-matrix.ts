function kWeakestRows(mat: number[][], k: number): number[] {

    const ROWS = mat.length;
    const COLS = mat[0].length;
    
    const rows: { row: number, count: number }[] = [];

    for(let row = 0; row < ROWS; row += 1) {
        let count = 0;
        for(let col = 0; col < COLS; col += 1) {
            if(mat[row][col] === 1) {
                count += 1;
            } else {
                break;
            }
        }
        rows.push({ row, count });
    }

    // Sort by count, then by row index for ties
    rows.sort((a, b) => {
        // Try by count first
        if(a.count !== b.count) {
            return a.count - b.count;
        } else {
            // Then by row if count are equal
            return a.row - b.row;
        }
    });

    const res: number[] = [];
    let i = 0;
    while(i < k) {
        const { row } = rows[i];
        res.push(row);
        i += 1;
    }
    return res;

};