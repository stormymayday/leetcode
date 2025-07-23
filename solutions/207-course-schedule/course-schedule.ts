function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): boolean {
    const numParents = new Map<number, number>();
    for(const node of adjList.keys()) {
        if(!numParents.has(node)) {
            numParents.set(node, 0);
        }
    }
    for(const parent of adjList.keys()) {
        for(const child of adjList.get(parent)) {
            numParents.set(child, numParents.get(child) + 1);
        }
    }

    const queue: number[] = [];
    for(const [node, inDegree] of numParents.entries()) {
        if(inDegree === 0) {
            queue.push(node);
        }
    }

    const topOrder: number[] = [];
    while(queue.length > 0) {
        const current = queue.shift();
        topOrder.push(current);
        for(const child of adjList.get(current)) {
            if(numParents.has(child)) {
                numParents.set(child, numParents.get(child) - 1);
                if(numParents.get(child) === 0) {
                    queue.push(child);
                }
            }
        }
    }

    if(topOrder.length === adjList.size) {
        return true;
    } else {
        return false;
    }
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
    }
    return adjList;
}