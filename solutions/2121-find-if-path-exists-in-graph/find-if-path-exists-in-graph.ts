function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const graph = buildGraph(edges);
    return hasPathDFS(graph, source, destination, new Set<number>());
}

function buildGraph(edges: number[][]): Map<number, number[]> {

    const aList = new Map<number, number[]>();

    for (const [a, b] of edges) {
        if (!aList.has(a)) {
            aList.set(a, []);
        }
        if (!aList.has(b)) {
            aList.set(b, []);
        }
        aList.get(a).push(b);
        aList.get(b).push(a);
    }

    return aList;
}

function hasPathDFS(
    graph: Map<number, number[]>,
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

        for (const neighbor of graph.get(current)) {
            stack.push(neighbor);
        }
    }

    return false;
}