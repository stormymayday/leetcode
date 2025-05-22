function buildGraph(edges) {
    const adjList = {};
    for(const edge of edges) {
        const [a, b] = edge;

        if(!(a in adjList)) {
            adjList[a] = [];
        }
        adjList[a].push(b);

        if(!(b in adjList)) {
            adjList[b] = [];
        }
        adjList[b].push(a);
    }
    return adjList;
}

function hasPathRDFS(graph, src, dst, visited) {
    // Base Case
    if(src === dst) {
        return true;
    }

    // Handle Cycles
    if(visited.has(src)) {
        return false;
    } else {
        visited.add(src);
    }

    // Recursive Step
    for(const neighbor of graph[src]) {
        if(hasPathRDFS(graph, neighbor, dst, visited) === true) {
            return true;
        }
    }

    // Visited all possible verticies and no match was found
    return false;
}

function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(edges);
    return hasPathRDFS(graph, source, destination, new Set());
};