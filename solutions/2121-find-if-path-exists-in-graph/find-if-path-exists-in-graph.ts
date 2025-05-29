function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(n, edges);
    return hasPathDFS(graph, source, destination, new Set());
};

function hasPathDFS(graph, src, dst, visited) {
    const stack = [src];
    visited.add(src);
    while(stack.length > 0) {
        const current = stack.pop();
        if(current === dst) {
            return true;
        }
        for(const neighbor of graph[current]) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
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