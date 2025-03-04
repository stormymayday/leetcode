function generateMatrix(n: number): number[][] {

    const matrix = [];
    for(let i = 0; i < n; i++) {
        matrix.push([]);
    }

    let counter = 1;

    let leftColumnPointer = 0;
    let rightColumnPointer = n - 1;
    let topRowPointer = 0;
    let bottomRowPointer = n - 1;

    while(leftColumnPointer <= rightColumnPointer && topRowPointer <= bottomRowPointer) {
        
        // 1. Filling in the top row
        for(let i = leftColumnPointer; i <= rightColumnPointer; i++) {
            matrix[topRowPointer][i] = counter;
            counter++;
        }
        // Shift the top row pointer down (increment)
        topRowPointer++;

        // 2. FIlling in the right column
        for(let i = topRowPointer; i <= bottomRowPointer; i++) {
            matrix[i][rightColumnPointer] = counter;
            counter++;
        }
        // Shift the right column pointer to the left (decrement)
        rightColumnPointer--;

        // 3. Filling in the bottom row (in reverse)
        for(let i = rightColumnPointer; i >= leftColumnPointer; i--) {
            matrix[bottomRowPointer][i] = counter;
            counter++;
        }
        // Shift the bottom row pointer up (decrement)
        bottomRowPointer--;

        // 4. Filling in the left column in reverse
        for(let i = bottomRowPointer; i >= topRowPointer; i--) {
            matrix[i][leftColumnPointer] = counter;
            counter++;
        }
        // Shift the left column pointer to the right (increment)
        leftColumnPointer++;

    }

    return matrix;
    
};