function validTree(n: number, edges: number[][]): boolean {

    const adjList = buildAdjList(n, edges);

    const visited = new Set<number>();

    // kicking off 'dfs' from node '0' (using null as the initial 'source')
    const cycleDetected = dfs(0, adjList, visited, null);
    // goal is to visit all the nodes AND find cycles

    // if there are no cycles AND all nodes have been visited, it is a valid tree
    return cycleDetected && visited.size === n;

};

function dfs(node: number, adjList: Map<number, number[]>, visited: Set<number>, source: null | number): boolean {
    // Base Case: visited
    if (visited.has(node)) {
        return false; // cycle
    }

    // mark as visited
    visited.add(node);

    for (const neighbor of adjList.get(node)) {
        // Since graph is un-directed, we should not travel back to 'source'
        if (neighbor !== source) {
            // If cycle is found, exit early
            if (dfs(neighbor, adjList, visited, node) === false) {
                return false;
            }
        }
    }

    // no cycles found
    return true;
}

function buildAdjList(n: number, edges: number[][]): Map<number, number[]> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for (const [src, dst] of edges) {
        adjList.get(src).push(dst);
        adjList.get(dst).push(src);
    }
    return adjList;
}
