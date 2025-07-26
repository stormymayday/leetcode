function findMinHeightTrees(n: number, edges: number[][]): number[] {
    // Edge Case: 1 Node / 0 Edges
    if(n === 1 || edges.length === 0) {
        return [0];
    }

    const adjList = buildAdjList(n, edges);
    return kahnsAlgorithm(adjList);
};

function kahnsAlgorithm(adjList: Map<number, Set<number>>): number[] {
    // 1. Get the edge count for each node and Queue up nodes with edge count of 1 (leaves)
    // let leaves: number[] = []; 
    // const edgeCount = new Map<number, number>();
    // for(const [node, neighbors] of adjList.entries()) {
    //     edgeCount.set(node, neighbors.size);
    //     if(neighbors.size === 1) {
    //         leaves.push(node);
    //     }
    // }

    // 1. Queue up nodes with 1 neighbor (leaves)
    let leaves: number[] = [];
    for(const [node, neighbours] of adjList.entries()) {
        if(neighbours.size === 1) {
            leaves.push(node);
        }
    }

    // 2. process nodes layer by layer (BFS) until there are at most 2 nodes left (centroids)
    let nodesRemaining = adjList.size;
    while(nodesRemaining > 2) {
        nodesRemaining -= leaves.length;
        const nextLayerLeaves: number[] = [];
        // process every leaf on current layer
        for(const leaf of leaves) {
            // A leaf in a tree should only have 1 neighbor (parent)
            const neighbours = adjList.get(leaf); // this returns a set
            const parent = [...neighbours][0]; // extract the parent

            // delete the leaf from parent's list
            adjList.get(parent).delete(leaf);
            // if parent's neighbour count is 1, push it into nextLayerLeaves
            if(adjList.get(parent).size === 1) {
                nextLayerLeaves.push(parent);
            }   
        }
        // update the leaves
        leaves = nextLayerLeaves;
    }
    return leaves;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [a, b] = edge;
        adjList.get(a).add(b);
        adjList.get(b).add(a);
    }
    return adjList;
}