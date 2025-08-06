function allPathsSourceTarget(graph: number[][]): number[][] {
    const result: number[][] = [];
    const path: number[] = [0];
    function dfsHelper(src) {
        if(src === graph.length - 1) {
            result.push([...path]);
            // return;
        }
        for(const neighbor of graph[src]) {
            path.push(neighbor);
            dfsHelper(neighbor);
            path.pop();
        }
    }
    dfsHelper(0);
    return result;
 };