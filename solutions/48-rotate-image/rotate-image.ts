function rotate(matrix: number[][]): void {

     const n: number = matrix.length;
    
    // Process layer by layer from outside to inside
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {

        // Define boundaries of current layer
        const top: number = layer;        
        const left: number = layer;
        const right: number = n - 1 - layer;
        const bottom: number = n - 1 - layer
        
        // For each element in the current layer
        for (let i = 0; i < right - left; i++) {

            // Store all four elements that will be rotated
            const topLeft: number = matrix[top][left + i];
            const topRight: number = matrix[top + i][right];
            const bottomRight: number = matrix[bottom][right - i];
            const bottomLeft: number = matrix[bottom - i][left];
            
            // PERFORM CLOCKWISE ROTATION USING SAVED VALUES

            // Right column gets value from top row
            matrix[top + i][right] = topLeft;
            // Bottom row gets value from right column
            matrix[bottom][right - i] = topRight;
             // Left column gets value from bottom row
            matrix[bottom - i][left] = bottomRight;
            // Top row gets value from left column
            matrix[top][left + i] = bottomLeft;
        }
    }
}
