function generate(numRows: number): number[][] {

    const res: number[][] = [[1]];

    for (let i = 1; i < numRows; i += 1) {

        const curr: number[] = [];
        const prev: number[] = [0, ...res[i - 1], 0];

        for(let j = 0; j < prev.length - 1; j += 1) {

            const sum = prev[j] + prev[j + 1];
            curr.push(sum);

        }

        res.push(curr);

    }

    return res;

};