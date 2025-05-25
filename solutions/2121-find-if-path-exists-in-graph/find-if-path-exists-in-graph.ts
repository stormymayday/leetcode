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
    const queue = [src];
    visited.add(src);
    while(queue.length > 0) {
        const current = queue.shift();
        if(current === dst) {
            return true;
        }
        for(const neighbor of graph.get(current) ?? []) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }
    return false;
}