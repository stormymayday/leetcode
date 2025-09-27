function allPathsSourceTarget(graph: number[][]): number[][] {
    
    const res: number[][] = [];
    backtrackDFS(0, graph.length - 1, graph, [0], res); // src, dst, graph, path, res
    return res;

};

function backtrackDFS(src: number, dst: number, graph: number[][], path: number[], res: number[][]): void {
    
    // Base Case: reached the destination
    if(src === dst) {
        res.push([...path]);
        return; 
    }

    for(const neighbor of graph[src]) {
        path.push(neighbor);
        backtrackDFS(neighbor, dst, graph, path, res);
        path.pop(); // Backtracking
    }

    return;
}