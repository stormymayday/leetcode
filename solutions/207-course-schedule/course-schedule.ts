function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const adjList = buildAdjList(numCourses, prerequisites);
    const visiting = new Set<number>();
    const visited = new Set<number>();
    for(const node of adjList.keys()) {
        if(hasCycle(adjList, node, visiting, visited) === true) {
            return false;
        }
    }
    return true;
};

function hasCycle(adjList: Map<number, Set<number>>, src: number, visiting: Set<number>, visited: Set<number>):boolean {
    if(visited.has(src)) {
        return false;
    }

    if(visiting.has(src)) {
        return true;
    }

    visiting.add(src);

    for(const neighbor of adjList.get(src)) {
        if(hasCycle(adjList, neighbor, visiting, visited) === true) {
            return true;
        }
    }

    visiting.delete(src);
    visited.add(src);

    return false;
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