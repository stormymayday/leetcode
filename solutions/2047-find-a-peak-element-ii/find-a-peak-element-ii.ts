function findPeakGrid(mat: number[][]): number[] {

    let max = -1;
    const res = [-1, -1];

    for(let row = 0; row < mat.length; row += 1) {
        for(let col = 0; col < mat[0].length; col += 1) {
            if(mat[row][col] > max) {
                max = mat[row][col];
                res[0] = row;
                res[1] = col;
            }
        }
    }

    return res;

};