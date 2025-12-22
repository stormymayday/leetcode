function generate(numRows: number): number[][] {

    const res: number[][] = [[1]];

    for(let i = 1; i < numRows; i += 1) {
        
        // pre-pending 1
        const currRow: number[] = [1];

        for(let j = 0; j < res[i - 1].length - 1; j += 1) {

            currRow.push(res[i - 1][j] + res[i - 1][j + 1]);

        }

        // post-pending 1
        currRow.push(1);

        res.push(currRow);

    }

    return res;

};