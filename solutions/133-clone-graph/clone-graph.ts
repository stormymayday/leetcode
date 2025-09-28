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

    if (node === null) {
        return null;
    }

    const originalToClone = new Map<_Node, _Node>();

    // return dfs(node, originalToClone);

    return bfs(node, originalToClone);

};

function bfs(node: _Node, originalToClone: Map<_Node, _Node>): _Node {

    let queue: _Node[] = [];
    queue.push(node);

    const clone = new _Node(node.val);
    originalToClone.set(node, clone);

    while (queue.length > 0) {

        const nextQueue: _Node[] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            for (const neighbor of currNode.neighbors) {

                // Neighbor has not been visited
                if (!originalToClone.has(neighbor)) {
                    
                    // Clone the neighbor
                    const neighborClone = new _Node(neighbor.val);
                    // Add entry to the hash map
                    originalToClone.set(neighbor, neighborClone);
                    // Queue up the neighbor
                    nextQueue.push(neighbor);

                }

                // Create and edge from current to neigbor
                const currentClone = originalToClone.get(currNode);
                const neighborClone = originalToClone.get(neighbor);
                currentClone.neighbors.push(neighborClone);

            }

        }

        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return clone;

}

function dfs(node: _Node, originalToClone: Map<_Node, _Node>): _Node {

    if (originalToClone.has(node)) {
        return originalToClone.get(node);
    }


    const clone = new _Node(node.val);

    originalToClone.set(node, clone);

    for (const neighbor of node.neighbors) {

        clone.neighbors.push((dfs(neighbor, originalToClone)));

    }

    return clone;

}