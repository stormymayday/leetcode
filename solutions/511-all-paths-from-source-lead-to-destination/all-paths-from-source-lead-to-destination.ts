function leadsToDestination(n: number, edges: number[][], source: number, destination: number): boolean {
    const adjList = buildAdjList(n, edges);
    const visiting = new Set<number>();
    const visited = new Set<number>();
    return dfs(adjList, source, destination, visiting, visited);
};

function dfs(adjList: Map<number, Set<number>>, src: number, dst: number, visiting: Set<number>, visited: Set<number>): boolean {
    
    if(visited.has(src)) {
        return true; // so far, no cycle
    }
    
    if(visiting.has(src)) {
        return false; // cycle
    }

    // If this is a leaf node, it should be equal to the destination.
    if(adjList.get(src).size === 0) {
        return src === dst;
    }

    visiting.add(src);

    for(const neighbor of adjList.get(src)) {
        if(dfs(adjList, neighbor, dst, visiting, visited) === false) {
            return false;
        }
    }

    visiting.delete(src);
    visited.add(src);
    return true;

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