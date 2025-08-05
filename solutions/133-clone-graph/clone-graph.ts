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
    // hash map (key: original, value: clone) acts as visited set
	const originalToClone = new Map<_Node, _Node>();
    function dfs(node: _Node | null): _Node | null {
        // Base Case 1: (edge case) null input
        if(node === null) {
            return node;
        }
        // Base Case 2: node already in the hash map (visited)
        if(originalToClone.has(node)) {
            // return clone
            return originalToClone.get(node);
        }
        // Create clone
        const clone = new _Node(node.val, []);
        // Add entry to the hash map (key: original, value: clone)
        originalToClone.set(node, clone);
        // Iterate over ALL neighbors and add their clones
        for(const neighbor of node.neighbors) {
            const neighborClone = dfs(neighbor);
            if(neighborClone !== null) {
                clone.neighbors.push(dfs(neighbor));
            }
        }
        return clone;
    }
    return dfs(node);
};