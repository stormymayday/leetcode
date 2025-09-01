function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahns(numCourses, adjList);
};

function kahns(n: number, adjList: Map<number, Set<number>>): number[] {
    // 1. Build and inDegree hash map
    const inDegree = new Map<number, number>();
    for (let i = 0; i < n; i += 1) {
        inDegree.set(i, 0);
        // for(const neighbor of adjList.get(i)) {
        //     inDegree.set(neighbor, (inDegree.get(neighbor) || 0) + 1);
        // }
    }
    for (let i = 0; i < n; i += 1) {
        for (const neighbor of adjList.get(i)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialze 'ready' queue
    const queue: number[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            queue.push(node);
        }
    }

    // 3. BFS
    const topOrder: number[] = [];
    while (queue.length > 0) {
        const currNode = queue.shift();
        topOrder.push(currNode);
        for (const neighbor of adjList.get(currNode)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 4. Cycle check
    if (topOrder.length === n) {
        return topOrder;
    } else {
        return [];
    }
}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [dst, src] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
};