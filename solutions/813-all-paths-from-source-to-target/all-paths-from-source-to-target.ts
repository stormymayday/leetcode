function allPathsSourceTarget(graph: number[][]): number[][] {
    const res: number[][] = [];
    const path: number[] = [];
    function helper(node: number): void {

        path.push(node);

        if(node === graph.length - 1) {
            res.push([...path]);
        }

        for(const neighbor of graph[node]) {
            helper(neighbor);
        }

        path.pop();
        
    }
    helper(0);
    return res;
};