function findMinHeightTrees(n: number, edges: number[][]): number[] {
    
    // Edge Case: Single Node
    if(n === 1) {
        return [0];
    }
    
    const adjList = buildAdjList(n, edges);
    
    return bfs(adjList);
};

function bfs(adjList: Map<number, Set<number>>): number[] {
    // 1. Create a neighbour count map
    const neighborCount = new Map<number, number>();
    for(const [node, neighbors] of adjList.entries()) {
        neighborCount.set(node, neighbors.size);
    }
    
    // 2. Queue up the leaves (nodes with neighbor count of 1)
    let leaves = [];
    for(const [node, count] of neighborCount.entries()) {
        if(count === 1) {
            leaves.push(node);
        }
    }
    
    // 3. Process leaves layer by layer until there are at most 2 nodes left (centroids)
    let nodeCount = adjList.size;
    while(nodeCount > 2) {
        // update the node count
        nodeCount -= leaves.length;
        const nextLayerLeaves = [];
        // Process current layer leaves
        while(leaves.length > 0) {
            const current = leaves.shift();
            for(const neighbor of adjList.get(current)) {
                neighborCount.set(neighbor, neighborCount.get(neighbor) - 1);
                if(neighborCount.get(neighbor) === 1) {
                    // next layer leaves
                    nextLayerLeaves.push(neighbor);
                }
            }
        }
        // queue up next layer leaves
        leaves = nextLayerLeaves;
    }
    // return the centroid(s)
    return leaves;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}

