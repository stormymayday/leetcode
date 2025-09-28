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

    if(node === null) {
        return null;
    }

    const originalToClone = new Map<_Node, _Node>();

    return dfs(node, originalToClone);
	
};

function dfs(node: _Node, originalToClone: Map<_Node, _Node>): _Node {
    
    if(originalToClone.has(node)) {
        return originalToClone.get(node);
    }


    const clone = new _Node(node.val);

    originalToClone.set(node, clone);

    for(const neighbor of node.neighbors) {

        clone.neighbors.push((dfs(neighbor, originalToClone)));

    }

    return clone;

}