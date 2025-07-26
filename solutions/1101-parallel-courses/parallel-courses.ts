function minimumSemesters(n: number, relations: number[][]): number {
    const adjList = buildAdjList(n, relations);
    return kahnsAlgorithm(adjList);
};

function kahnsAlgorithm(adjList: Map<number, Set<number>>): number {
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const parent of adjList.keys()) {
        for(const child of adjList.get(parent)) {
            inDegree.set(child, inDegree.get(child) + 1);
        }
    }
    let queue: number[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 0) {
            queue.push(node);
        }
    }
    
    let nodesRemaining = adjList.size;
    let layers = 1;
    while(true) {
        nodesRemaining -= queue.length;
        const nextLayer: number[] = [];
        // Option 1: Shifting from queue
        while(queue.length > 0) {
            const current = queue.shift();
        // Option 2: Iterating over the queue
        // for(let i = 0; i < queue.length; i += 1) {
        //     const current = queue[i];
            for(const child of adjList.get(current)) {
                inDegree.set(child, inDegree.get(child) - 1);
                if(inDegree.get(child) === 0) {
                    nextLayer.push(child);
                }
            }
        }
        if(nextLayer.length === 0) {
            break;
        }
        queue = nextLayer;
        layers += 1;
    }
    if(nodesRemaining === 0) {
        return layers;
    } else {
        return -1;
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