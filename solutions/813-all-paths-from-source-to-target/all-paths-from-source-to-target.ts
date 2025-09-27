function allPathsSourceTarget(graph: number[][]): number[][] {
    
    const res: number[][] = [];
    backtrackDFS(0, graph.length - 1, graph, [], res);
    return res;

};

function backtrackDFS(src: number, dst: number, graph: number[][], path: number[], res: number[][]): void {
    
    path.push(src);
    
    // Base Case: reached the destination
    if(src === dst) {
        res.push([...path]);
        return; 
    }

    for(const neighbor of graph[src]) {
        backtrackDFS(neighbor, dst, graph, path, res);
        path.pop();
    }
}