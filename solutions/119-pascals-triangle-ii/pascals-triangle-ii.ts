function getRow(rowIndex: number): number[] {

    const triangle: number[][] = [[1]];

    for(let i = 1; i <= rowIndex; i += 1) {

        const prevRow = triangle[i - 1];

        const currRow = [1];
        for(let j = 0; j < prevRow.length - 1; j += 1) {
            currRow.push(prevRow[j] + prevRow[j + 1]); 
        }
        currRow.push(1);

        triangle.push(currRow);

    }

    return triangle[rowIndex];
    
};