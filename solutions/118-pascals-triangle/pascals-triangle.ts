function generate(numRows: number): number[][] {

    // Starting with a default top row for of '1'
    const res = [[1]];

    // Going until numRows - 1 (first row is already done)
    for (let i = 0; i < numRows - 1; i += 1) {

        // Get the previous row and prepend & append it with zeroes
        const temp = [0, ...res[res.length - 1], 0];

        // Note: Current row should be longer by 1 element
        const currRow = [];
        for (let j = 0; j < temp.length - 1; j += 1) {
            const sumNeighbors = temp[j] + temp[j + 1];
            currRow.push(sumNeighbors);
        }

        res.push(currRow);

    }

    return res;

};