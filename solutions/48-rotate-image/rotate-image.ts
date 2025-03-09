function rotate(matrix: number[][]): void {

    const n: number = matrix.length;
    
    // Process layer by layer from outside to inside
    for (let layer = 0; layer < Math.floor(n / 2); layer++) {
        // Define boundaries of current layer
        // Starting index of this layer
        const first: number = layer;
        // Ending index of this layer
        const last: number = n - 1 - layer;
        
        // For each element in the current layer's top row
        for (let i = first; i < last; i++) {
            // Calculate offset from beginning of layer
            const offset: number = i - first;
            
            // Store all four elements that will be rotated
            // Top element
            const top: number = matrix[first][i];
            // Right element             
            const right: number = matrix[i][last];
            // Bottom element           
            const bottom: number = matrix[last][last - offset];
            // Left element
            const left: number = matrix[last - offset][first];
            
            // Perform clockwise rotation using saved values

            // Right gets value from top
            matrix[i][last] = top;
            // Bottom gets value from right
            matrix[last][last - offset] = right;
            // Left gets value from bottom
            matrix[last - offset][first] = bottom;
            // Top gets value from left
            matrix[first][i] = left;
            
        }
    }
}
