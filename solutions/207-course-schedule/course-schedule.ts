function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    
    const adjList = buildAdjList(numCourses, prerequisites);

    const visiting = new Set<number>();
    const visited = new Set<number>();

    for(const course of adjList.keys()) {
        if(cycleDetect(adjList, course, visiting, visited) === true) {
            return false; // cycle detected -> can't finish
        }
    }

    return true; // no cycle -> can finish

};

function cycleDetect(adjList: Map<number, Set<number>>, src: number, visiting: Set<number>, visited: Set<number>):boolean {
    if(visited.has(src)) {
        return false;
    }

    if(visiting.has(src)) {
        return true;
    }

    visiting.add(src);

    for(const neighbor of adjList.get(src)) {
        if(cycleDetect(adjList, neighbor, visiting, visited) === true) {
            return true;
        }
    }

    visiting.delete(src);
    visited.add(src);

    return false;
}

function buildAdjList(n:number, edges: number[][]):Map<number, Set<number>> {
    const adjList = new Map<number, Set<number>>();

    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set<number>());
    }

    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
    }

    return adjList;
}