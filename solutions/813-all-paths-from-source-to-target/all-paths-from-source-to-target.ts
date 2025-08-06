function allPathsSourceTarget(graph: number[][]): number[][] {

    const result: number[][] = [];
    const path: number[] = [];

    function helperDFS(node) {

        path.push(node);

        if(node === graph.length - 1) {
            result.push([...path]);
        }

        for(const neighbor of graph[node]) {
            helperDFS(neighbor);
        }

        path.pop();

    }
    helperDFS(0);
    return result;
};