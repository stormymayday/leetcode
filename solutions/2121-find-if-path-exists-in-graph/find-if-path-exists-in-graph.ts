function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(edges);
    return hasPathDFS(graph, source, destination, new Set<number>());
}

function buildGraph(edges: number[][]): Record<number, number[]> {

    const aList: Record<number, number[]> = {};

    for (const [a, b] of edges) {
        if (!(a in aList)) {
            aList[a] = [];
        }
        if (!(b in aList)) {
            aList[b] = [];
        }
        aList[a].push(b);
        aList[b].push(a);
    }

    return aList;
}

function hasPathDFS(
    graph: Record<number, number[]>,
    src: number,
    dst: number,
    visited: Set<number>
): boolean {
    
    const stack: number[] = [src];

    while (stack.length > 0) {
        const current = stack.pop()!;
        
        if (current === dst) return true;
        if (visited.has(current)) continue;

        visited.add(current);

        for (const neighbor of graph[current]) {
            stack.push(neighbor);
        }
    }

    return false;
}