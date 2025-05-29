function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(n, edges);
    return hasPathDFS(graph, source, destination, new Set());
};

function hasPathDFS(graph, src, dst, visited) {
    if(visited.has(src)) {
        return false;
    } else {
        visited.add(src);
    }

    if(src === dst) {
        return true;
    }

    for(const neighbor of graph[src]) {
        if(hasPathDFS(graph, neighbor, dst, visited) === true) {
            return true;
        }
    }

    return false;
}

function buildGraph(n, edges) {
    const adjList = {};
    for(let i = 0; i < n; i++) {
        adjList[i] = [];
    }
    for(const edge of edges) {
        const [a, b] = edge;
        adjList[a].push(b);
        adjList[b].push(a);
    }
    return adjList;
}