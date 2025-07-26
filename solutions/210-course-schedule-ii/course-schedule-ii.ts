function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahnsAlgorithm(adjList);
};

function kahnsAlgorithm(adjList: Map<number, Set<number>>):number[] {
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const prereq of adjList.keys()) {
        for(const course of adjList.get(prereq)) {
            inDegree.set(course, inDegree.get(course) + 1);
        }
    }
    const queue: number[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 0) {
            queue.push(node);
        }
    }
    const topOrder: number[] = [];
    while(queue.length > 0) {
        const current = queue.shift();
        topOrder.push(current);
        for(const course of adjList.get(current)) {
            inDegree.set(course, inDegree.get(course) - 1);
            if(inDegree.get(course) ===  0) {
                queue.push(course);
            }
        }
    }
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return [];
    }
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [course, prereq] = edge;
        adjList.get(prereq).add(course);
    }
    return adjList;
}