function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    let result: boolean[] = [];
    for(const query of queries) {
        const [src, dst] = query;
        result.push(dfs(adjList, src, dst, new Set()));
    }
    return result;
};

function dfs(adjList: Map<number, Set<number>>, src: number, dst: number, visited: Set<number>):boolean {

    // Mark the current node src as visited
    visited.add(src);

    // we found the path
    if(src === dst) {
        return true;
    }

    for(const neighbor of adjList.get(src)) {
        // If neighbor has not been visited yet
        if(!visited.has(neighbor)) {
            // recursively call the DFS to check if a path exists from neighbor to target.
            if(dfs(adjList, neighbor, dst, visited) === true) {
                // Return the true if the result of at least one recursive call is true
                return true;
            }
        }
        
    }
    //  Otherwise, return false
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
