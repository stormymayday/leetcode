function findMinHeightTrees(n: number, edges: number[][]): number[] {
    // Edge Case: single node => no edges
    if(n === 1 || edges.length === 0) {
        return [0];
    }
    const adjList = buildAdjList(n, edges);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): number[] {
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }
    let queue: number[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 1) {
            queue.push(node);
        }
    }
    let nodesRemaining = adjList.size;
    while(nodesRemaining > 2) {
        nodesRemaining -= queue.length;
        const nextLayerLeaves: number[] = [];
        // process current layer leaves
        for(const node of queue) {
            for(const neighbor of adjList.get(node)) {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if(inDegree.get(neighbor) === 1) {
                    nextLayerLeaves.push(neighbor);
                }
            }
        }
        queue = nextLayerLeaves;
    }
    return queue;
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