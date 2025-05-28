function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    const graph = buildGraph(numCourses, prerequisites);
    const visiting = new Set();
    const visited = new Set();
    for(const node in graph) {
        if(hasCycle(graph, node, visiting, visited) === true) {
            return false;
        }
    }
    return true;
};

function buildGraph(n, edges) {
    const adjList = {};
    for(let i = 0; i < n; i++) {
        adjList[i] = [];
    }
    for(const edge of edges) {
        const [a, b] = edge;
        adjList[a].push(b);
    }
    return adjList;
}

function hasCycle(graph, node, visiting, visited) {
    if(visited.has(node)) {
        return false;
    }
    if(visiting.has(node)) {
        return true;
    }
    
    visiting.add(node);

    for(const neighbor of graph[node]) {
        if(hasCycle(graph, neighbor, visiting, visited) === true) {
            return true;
        }
    }

    visiting.delete(node);
    visited.add(node);

    return false;
}