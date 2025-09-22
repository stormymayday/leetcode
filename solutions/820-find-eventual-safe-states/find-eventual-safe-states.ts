function eventualSafeNodes(graph: number[][]): number[] {
    
    const visiting = new Set<number>();
    const visited = new Set<number>();

    for(let i = 0; i < graph.length; i += 1) {
        dfs(i, graph, visiting, visited);
    }

    return [...visited].sort((a, b) => a - b);

};

function dfs(node: number, graph: number[][], visiting: Set<number>, visited: Set<number>): boolean {

    if(visited.has(node)) {
        return false; // no cycle
    }

    if(visiting.has(node)) {
        return true; // cycle
    }

    visiting.add(node);

    for(const neighbor of graph[node]) {
        if(dfs(neighbor, graph, visiting, visited) === true) {
            return true; // cycle
        }
    }

    visiting.delete(node);
    visited.add(node);
    return false; // no cycle
}