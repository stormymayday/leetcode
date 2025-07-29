function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
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
    const stack: number[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 0) {
            stack.push(node);
        }
    }
    const topOrder: number[] = [];
    while(stack.length > 0) {
        const current = stack.pop();
        topOrder.push(current);
        for(const neighbor of adjList.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }
        }
    }
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return []; // graph has a cycle
    }
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1){
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [course, prereq] = edge;
        adjList.get(prereq).add(course);
    }
    return adjList;
}