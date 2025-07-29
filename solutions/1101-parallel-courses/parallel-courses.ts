function minimumSemesters(n: number, relations: number[][]): number {
    const adjList = buildAdjList(n, relations);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): number {
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
        if(count === 0) {
            queue.push(node);
        }
    }
    let nodesRemaining = adjList.size;
    let result = 1; // one layer is already in the queue
    while(true) {
        nodesRemaining -= queue.length;
        const nextLayerNodes: number[] = [];
        // process all nodes at the current layer
        for(const node of queue) {
            for(const neighbor of adjList.get(node)) {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if(inDegree.get(neighbor) === 0) {
                    nextLayerNodes.push(neighbor);
                }
            }
        }
        if(nextLayerNodes.length === 0) {
            break;
        }
        result += 1;
        queue = nextLayerNodes;
    }
    if(nodesRemaining === 0) {
        return result;
    } else {
        return -1; // cycle
    }
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
    }
    return adjList;
}