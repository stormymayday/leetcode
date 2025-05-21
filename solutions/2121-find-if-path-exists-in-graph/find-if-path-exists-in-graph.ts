function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(edges);
    return hasPathDFS(graph, source, destination, new Set());
};

function buildGraph(edges: number[][]) {
    const aList = {};
    for(const edge of edges) {
        const [a, b] = edge;
        if(!(a in aList)) {
            aList[a] = [];
        }
        if(!(b in aList)) {
            aList[b] = [];
        }
        aList[a].push(b);
        aList[b].push(a);
    }
    return aList;
}

function hasPathDFS(graph, src, dst, visited):boolean {
    const stack = [src];
    while(stack.length > 0) {
        const current = stack.pop();

        if(current === dst) {
            return true;
        }

        if(visited.has(current)) {
            continue;
        } else {
            visited.add(current);
        }

        for(const neighbor of graph[current]) {
            stack.push(neighbor);
        }
    }
    return false;
}