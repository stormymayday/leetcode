function allPathsSourceTarget(graph: number[][]): number[][] {
    
    const res: number[][] = [];
    backtrackDFS(0, graph.length - 1, graph, [0], res);
    return res;

};

function backtrackDFS(
    src: number, 
    target: number, 
    graph: number[][],
    path: number[],
    res: number[][],
    ): void {

        if(src === target) {
            res.push([...path]);
            return;
        }

        for(const neighbor of graph[src]) {
            path.push(neighbor);
            backtrackDFS(neighbor, target, graph, path, res);
            path.pop();
        }

}