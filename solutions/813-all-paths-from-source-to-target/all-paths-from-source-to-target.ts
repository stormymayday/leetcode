function allPathsSourceTarget(graph: number[][], src:number = 0): number[][] {
    if(src === graph.length - 1) {
        return [[graph.length - 1]];
    }

    if(graph[src].length === 0) {
        return [];
    }

    const allPaths = [];
    for(const neighbor of graph[src]) {
        const neighborPaths = allPathsSourceTarget(graph, neighbor);
        for(const neighborPath of neighborPaths) {
            allPaths.push([src, ...neighborPath]);
        }
    }
    return allPaths;
};