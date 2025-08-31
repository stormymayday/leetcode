function kWeakestRows(mat: number[][], k: number): number[] {

    const ROWS = mat.length;
    const COLS = mat[0].length;

    // 1. Initalize a max Priority Queue
    const maxPQ: [number, number][] = []; // [row index, 1s count * ROWS + row Index (tie-breaker)]
    for(let row = 0; row < ROWS; row += 1) {
        let soldierCount = 0;
        for(let col = 0; col < COLS; col += 1) {
            if(mat[row][col] === 1) {
                soldierCount += 1;
            } else {
                break;
            }
        }
        if(maxPQ.length < k) {
            maxPQ.push([row, soldierCount * ROWS + row]);
        } else {
            maxPQ.sort((a, b) => b[1] - a[1]);
            if(soldierCount * ROWS + row < maxPQ[0][1]) {
                maxPQ.shift();
                maxPQ.push([row, soldierCount * ROWS + row]);
            }
        }
    }

    maxPQ.sort((a, b) => b[1] - a[1]);
    const res: number[] = [];
    while(maxPQ.length > 0) {
        const [row, tieBreaker] = maxPQ.shift();
        res.push(row);
    }
    return res.reverse();
    
};