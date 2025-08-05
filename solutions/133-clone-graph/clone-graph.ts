/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     neighbors: _Node[]
 * 
 *     constructor(val?: number, neighbors?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.neighbors = (neighbors===undefined ? [] : neighbors)
 *     }
 * }
 * 
 */

function cloneGraph(node: _Node | null): _Node | null {
    return bfs(node);
}

function bfs(node: _Node | null): _Node | null {
    // Edge Case: null input
    if (node === null) {
        return node;
    }

    const originalToClone = new Map<_Node, _Node>();
    const queue: _Node[] = [node];
    const clone = new _Node(node.val, []);
    originalToClone.set(node, clone);
    
    while (queue.length > 0) {
        const current = queue.shift();
        
        for (const neighbor of current.neighbors) {
            if (!originalToClone.has(neighbor)) {
                // Create clone with neighbor's value
                const neighborClone = new _Node(neighbor.val, []);
                originalToClone.set(neighbor, neighborClone);
                queue.push(neighbor);
            }
            // Add the neighbor's clone to current's clone neighbors
            originalToClone.get(current).neighbors.push(originalToClone.get(neighbor));
        }
    }

    return originalToClone.get(node)!;
}