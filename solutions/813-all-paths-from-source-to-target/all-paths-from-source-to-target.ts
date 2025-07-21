function allPathsSourceTarget(graph: number[][]): number[][] {
    const res: number[][] = [];
    const path: number[] = [];
    function helper(src) {

        path.push(src);

        if(src === graph.length - 1) {
            res.push([...path]);
        }

        for(const neighbor of graph[src]) {
            helper(neighbor);
        }

        path.pop();
    }
    helper(0);
    return res;
};