function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahn(adjList);
};

function kahn(adjList: Map<number, Set<number>>): number[] {
    // 1. Get parent count
    const numParents = new Map<number, number>();
    for(const node of adjList.keys()) {
        numParents.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const child of adjList.get(node)) {
            numParents.set(child, numParents.get(child) + 1);
        }
    }

    // 2. Get nodes with no parents
    const ready = [];
    for(const node of numParents.keys()) {
        if(numParents.get(node) === 0) {
            ready.push(node);
        }
    }

    // 3. get topological order
    const topologicalOrder = [];
    while(ready.length > 0) {
        const current = ready.pop();
        topologicalOrder.push(current);
        for(const child of adjList.get(current)) {
            numParents.set(child, numParents.get(child) - 1);
            if(numParents.get(child) === 0) {
                ready.push(child);
            }
        }
    }

    // 4. Check for cycles
    if(topologicalOrder.length !== adjList.size) {
        return [];
    } else {
        return topologicalOrder.reverse();
    }

}

function buildAdjList(n: number, edges: number[][]) {
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