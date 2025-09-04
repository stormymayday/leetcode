function largestPathValue(colors: string, edges: number[][]): number {
    const n = colors.length;
    
    // 1. Initialize data structures
    const indegree: number[] = new Array(n).fill(0);
    const colorCounts: number[][] = Array.from({ length: n }, () => new Array(26).fill(0));
    const graph: Map<number, number[]> = new Map();
    
    // Initialize graph with empty adjacency lists
    for (let i = 0; i < n; i++) {
        graph.set(i, []);
    }
    
    // 2. Build graph and calculate indegrees
    for (const [x, y] of edges) {
        graph.get(x)!.push(y);
        indegree[y]++;
    }
    
    // 3. Initialize queue with source nodes (indegree = 0)
    const queue: number[] = [];
    for (let i = 0; i < n; i++) {
        if (indegree[i] === 0) {
            queue.push(i);
            // KEY: Initialize source nodes with their color count = 1
            const colorIndex = colors.charCodeAt(i) - 'a'.charCodeAt(0);
            colorCounts[i][colorIndex] = 1;
        }
    }
    
    // 4. Kahn's algorithm with color count propagation
    let visited = 0;
    let maxColorCount = 0;
    
    while (queue.length > 0) {
        const node = queue.shift()!; // Dequeue (FIFO)
        visited++;
        
        // Process all neighbors of current node
        const neighbors = graph.get(node)!;
        for (const neighbor of neighbors) {
            // Propagate maximum color counts from current node to neighbor
            for (let c = 0; c < 26; c++) {
                colorCounts[neighbor][c] = Math.max(
                    colorCounts[neighbor][c], 
                    colorCounts[node][c]
                );
            }
            
            // Decrease neighbor's indegree
            indegree[neighbor]--;
            
            // If neighbor is now ready to be processed
            if (indegree[neighbor] === 0) {
                // KEY: Increment neighbor's own color count when it becomes ready
                const neighborColorIndex = colors.charCodeAt(neighbor) - 'a'.charCodeAt(0);
                colorCounts[neighbor][neighborColorIndex]++;
                queue.push(neighbor);
            }
        }
        
        // Track maximum color count seen so far
        for (let c = 0; c < 26; c++) {
            maxColorCount = Math.max(maxColorCount, colorCounts[node][c]);
        }
    }
    
    // 5. Check for cycles and return result
    return visited === n ? maxColorCount : -1;
}