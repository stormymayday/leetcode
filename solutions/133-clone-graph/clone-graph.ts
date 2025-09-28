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

    // return dfs(node, originalToClone);

    return bfs(node, originalToClone);
	
};

function bfs(node: _Node, originalToClone: Map<_Node, _Node>): _Node {

    // let queue: [_Node, _Node][] = [];
    let queue: _Node[] = [];

    const clone = new _Node(node.val);
    originalToClone.set(node, clone);

    // queue.push([node, clone]);
    queue.push(node);

    while(queue.length > 0) {

        // const nextQueue: [_Node, _Node][] = [];
        const nextQueue: _Node[] = [];

        for(let i = 0; i < queue.length; i += 1) {

            // const [currNode, currClone] = queue[i];
            const currNode = queue[i];

            for(const neighbor of currNode.neighbors) {
                
                // Neighbor has not been visited
                if(!originalToClone.has(neighbor)) {

                    const neighborClone = new _Node(neighbor.val);
                    originalToClone.set(neighbor, neighborClone);

                    // currClone.neighbors.push(neighborClone);
                    // neighborClone.neighbors.push(currClone);

                    // nextQueue.push([neighbor, neighborClone]);
                    nextQueue.push(neighbor);

                }

                // now 1 is the neighbor (going back)
                // neighborClone.neighbors.push(originalToClone.get(currNode)); // neighbor to curr
                // originalToClone.get(currNode).neighbors.push(neighborClone);
                
                // Otherwise, neighbor has been visited
                // Get the neighbor clone
                // Push clone of the current node to the neighbor clone's 'neighbors' array
                originalToClone.get(neighbor).neighbors.push(originalToClone.get(currNode));

            }

        } 

        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return clone;

}

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