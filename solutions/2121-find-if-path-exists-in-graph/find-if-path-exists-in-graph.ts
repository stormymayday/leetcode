function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const adjList = buildAdjList(n, edges);
    return dfs(source, destination, adjList, new Set());
};

function dfs(src: number, dst: number, adjList: Map<number, Set<number>>, visited: Set<number>): boolean {
    if(src === dst) {
        return true;
    }

    if(visited.has(src)) {
        return false;
    }

    visited.add(src);

    for(const neighbor of adjList.get(src)) {
        if(dfs(neighbor, dst, adjList, visited) === true) {
            return true;
        }
    }

    return false;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}