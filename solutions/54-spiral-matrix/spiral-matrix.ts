function spiralOrder(matrix: number[][]): number[] {
    // Array to store the spiral order traversal
    const result: number[] = [];

    // Edge case handling for empty matrix
    if (matrix.length === 0 || matrix[0].length === 0) {
        return result;
    }

    // Initialize the boundary pointers
    let leftColumnPointer = 0;
    let rightColumnPointer = matrix[0].length - 1; // Last column index
    let topRowPointer = 0;
    let bottomRowPointer = matrix.length - 1;    // Last row index

    // Continue traversal until boundaries cross
    while(leftColumnPointer <= rightColumnPointer && topRowPointer <= bottomRowPointer) {

        // 1. Traverse top row (left to right)
        for(let col = leftColumnPointer; col <= rightColumnPointer; col++) {
            result.push(matrix[topRowPointer][col]);
        }
        // Move top boundary down after traversing top row
        topRowPointer++;
        // Check if top boundary has crossed bottom boundary
        if(topRowPointer > bottomRowPointer) {
            break;
        }

        // 2. Traverse right column (top to bottom)
        for(let row = topRowPointer; row <= bottomRowPointer; row++) {
            result.push(matrix[row][rightColumnPointer]);
        }
        // Move right boundary left after traversing right column
        rightColumnPointer--;
        // Check if right boundary has crossed left boundary
        if(leftColumnPointer > rightColumnPointer) {
            break;
        }

        // 3. Traverse bottom row (right to left)
        for(let col = rightColumnPointer; col >= leftColumnPointer; col--) {
            result.push(matrix[bottomRowPointer][col]);
        }
        // Move bottom boundary up after traversing bottom row
        bottomRowPointer--;
        // Check if bottom boundary has crossed top boundary
        if(topRowPointer > bottomRowPointer) {
            break;
        }

        // 4. Traverse left column (bottom to top)
        for(let row = bottomRowPointer; row >= topRowPointer; row--) {
            result.push(matrix[row][leftColumnPointer]);
        }
        // Move left boundary right after traversing left column
        leftColumnPointer++;
        // Check if left boundary has crossed right boundary
        if(leftColumnPointer > rightColumnPointer) {
            break;
        }
    }

    return result;
};