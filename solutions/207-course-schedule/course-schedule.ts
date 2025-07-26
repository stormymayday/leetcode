function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const adjList = buildAdjList(numCourses, prerequisites);
    // return kahnsAlgorithm(adjList);
    const visiting = new Set<number>();
    const visited = new Set<number>();
    for(const node of adjList.keys()) {
        if(postOrderDFSWhiteGrayBlack(adjList, node, visiting, visited) === true) {
            return false; // cycle therefore not possible
        }
    }
    return true; // no cycle therefore possible
};

function postOrderDFSWhiteGrayBlack(adjList: Map<number, Set<number>>, src: number, visiting: Set<number>, visited: Set<number>):boolean {
    if(visited.has(src)) {
        return false; // no cycle
    }
    if(visiting.has(src)) {
        return true; // cycle
    }
    visiting.add(src);
    for(const neighbor of adjList.get(src)) {
        if(postOrderDFSWhiteGrayBlack(adjList, neighbor, visiting, visited) === true) {
            return true; // cycle
        }
    }
    visiting.delete(src);
    visited.add(src);
    return false; // no cycle
}

function kahnsAlgorithm(adjList: Map<number, Set<number>>):boolean {
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
    let nodesVisited = 0;
    while(queue.length > 0) {
        const current = queue.shift();
        nodesVisited += 1;
        for(const course of adjList.get(current)) {
            inDegree.set(course, inDegree.get(course) - 1);
            if(inDegree.get(course) ===  0) {
                queue.push(course);
            }
        }
    }
    return nodesVisited === adjList.size;
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