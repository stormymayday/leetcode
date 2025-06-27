function allPathsSourceTarget(graph: number[][], src:number = 0, dst:number = graph.length -1): number[][] {
    if(src === dst) {
        return [[src]];
    }

    if(graph[src].length === 0) {
        return [];
    }

    const allPaths = [];
    for(const neighbor of graph[src]) {
        const neighborPaths = allPathsSourceTarget(graph, neighbor, dst);
        for(const neighborPath of neighborPaths) {
            allPaths.push([src, ...neighborPath]);
        }
    }
    return allPaths;
};