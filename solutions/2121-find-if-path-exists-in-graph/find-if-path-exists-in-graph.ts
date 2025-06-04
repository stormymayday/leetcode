function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(n, edges);
    return dfs(graph, source, destination, new Set());
};

function dfs(graph, src, dst, visited) {
    
    if(src === dst) {
        return true;
    }

    if(visited.has(src)) {
        return false;
    }

    visited.add(src);

    for(const neighbor of graph.get(src)) {
        if(dfs(graph, neighbor, dst, visited) === true) {
            return true;
        }
    }

    return false;

}

function buildGraph(n, edges) {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(const edge of edges) {
        const [a, b] = edge;
        adjList.get(a).push(b);
        adjList.get(b).push(a);
    }
    return adjList;
}