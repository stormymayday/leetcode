function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(n, edges);
    return hasPath(graph, source, destination, new Set());
};

function buildGraph(n, edges) {
    const adjList = new Map();

    for(let i = 0; i < n; i ++) {
        adjList.set(i, []);
    }

    for(const edge of edges) {
        const [a, b] = edge;
        adjList.get(a).push(b);
        adjList.get(b).push(a);
    }

    return adjList;
}

function hasPath(graph, src, dst, visited) {
    if(visited.has(src)) {
        return false;
    } else {
        visited.add(src);
    }

    if(src === dst) {
        return true;
    }

    for(const neighbor of graph.get(src) ?? []) {
        if(hasPath(graph, neighbor, dst, visited) === true) {
            return true;
        } 
    }

    return false;
}