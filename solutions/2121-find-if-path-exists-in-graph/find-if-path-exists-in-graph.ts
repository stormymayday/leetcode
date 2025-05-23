function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(edges);
    return dfs(graph, source, destination, new Set());
};

function buildGraph(edges) {
    const adjList = new Map();
    for(const edge of edges) {
        const [a, b] = edge;
        if(!adjList.has(a)) {
            adjList.set(a, []);
        }
        adjList.get(a).push(b);
        if(!adjList.has(b)) {
            adjList.set(b, []);
        }
        adjList.get(b).push(a);
    }
    return adjList;
}

function dfs(graph, src, dst, visited) {

    const stack = [src];
    visited.add(src);

    while(stack.length > 0) {
        const current = stack.pop();
        if(current === dst) {
            return true;
        }
        for(const neighbor of graph.get(current) ?? []) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                stack.push(neighbor);
            }
        }
    }

    return false;

}