function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): boolean {
    // child to parents mapping
    const nodeParents = new Map<number, Set<number>>();
    for(const parent of adjList.keys()) {
        if(!nodeParents.has(parent)) {
            nodeParents.set(parent, new Set());
        }
        for(const child of adjList.get(parent)) {
            if(!nodeParents.has(child)) {
                nodeParents.set(child, new Set());
            }
            nodeParents.get(child).add(parent);
        }
    }
    // queue nodes with no parents
    const queue: number[] = [];
    for(const child of nodeParents.keys()) {
        if(nodeParents.get(child).size === 0) {
            queue.push(child);
        }
    }

    // Topological Ordering
    const topOrder: number[] = [];
    while(queue.length > 0) {
        const current = queue.shift();
        topOrder.push(current);
        for(const child of adjList.get(current)) {
            if(nodeParents.has(child)) {
                nodeParents.get(child).delete(current);
                if(nodeParents.get(child).size === 0) {
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