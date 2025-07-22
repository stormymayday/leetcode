function validTree(n: number, edges: number[][]): boolean {
    const adjList = buildAdjList(n, edges);
    const visited = new Set<number>();
    const result = dfs(adjList, 0, visited, -1);
    return result && visited.size === adjList.size;
};

function dfs(adjList: Map<number, Set<number>>, src: number, visited: Set<number>, prev: number): boolean {
    if(visited.has(src)) {
        return false;
    }

    visited.add(src);

    for(const neighbor of adjList.get(src)) {
        if(neighbor !== prev) {
            if(dfs(adjList, neighbor, visited, src) === false) {
                return false;
            }
        }
    }
    return true;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [a, b] = edge;
        adjList.get(a).add(b);
        adjList.get(b).add(a);
    }
    return adjList;
}