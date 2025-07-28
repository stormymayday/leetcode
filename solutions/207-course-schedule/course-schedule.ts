function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): boolean {
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
    let visited = 0;
    while(stack.length > 0) {
        const current = stack.pop();
        visited += 1;
        for(const neighbor of adjList.get(current)) {
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }
        }
    }
    if(visited === adjList.size) {
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
        const [course, prereq] = edge;
        adjList.get(prereq).add(course);
    }
    return adjList;
}