function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    
    // 1. Create an adjacency list
    const  adjList = buildAdjList(numCourses, prerequisites);

    // 2. Run DFS on every node
    const visiting = new Set();
    const visited = new Set();
    for(let i = 0; i < numCourses; i += 1) {
        if(!visited.has(i)) {
            if(postOrderDFS(i, adjList, visiting, visited) === false) {
                return false;
            }
        }
    }
    return true;

};

function postOrderDFS(node, adjList, visiting, visited): boolean {
    if(visited.has(node)) {
        return true; // no cycle
    }
    if(visiting.has(node)) {
        return false; // cycle
    }
    visiting.add(node);
    for(const neighbor of adjList.get(node)) {
        if(postOrderDFS(neighbor, adjList, visiting, visited) === false) {
            return false; // cycle
        }
    }
    visiting.delete(node);
    visited.add(node);
}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const  adjList = new Map<number, Set<number>>();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [dst, src] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}