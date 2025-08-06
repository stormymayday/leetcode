function allPathsSourceTarget(graph: number[][]): number[][] {
    const result: number[][] = [];
    const path: number[] = [];
    function dfsHelper(src) {
        path.push(src);
        if(src === graph.length - 1) {
            result.push([...path]);
        }
        for(const neighbor of graph[src]) {
            dfsHelper(neighbor);
        }
        path.pop();
    }
    dfsHelper(0);
    return result;
 };