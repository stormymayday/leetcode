function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const adjList = buildAdjList(n, edges);
    return dfs(adjList, source, destination, new Set());
};

function dfs(adjList, src, dst, visited) {
    if(src === dst) {
        return true;
    }

    for(const neighbor of adjList.get(src)) {
        if(!visited.has(neighbor)) {
            visited.add(neighbor);
            if(dfs(adjList, neighbor, dst, visited) === true) {
                return true;
            }
        }
    }

    return false;
}

function buildAdjList(n: number, edges:number[][]):Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}