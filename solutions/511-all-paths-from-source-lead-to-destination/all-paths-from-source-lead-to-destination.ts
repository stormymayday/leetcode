function leadsToDestination(n: number, edges: number[][], source: number, destination: number): boolean {

    const adjList = buildAdjList(n, edges);

    return backtrackDFS(source, destination, adjList, new Set<number>(), new Set<number>());

};

function backtrackDFS(
    src: number,
    dst: number,
    adjList: Map<number, Set<number>>,
    visiting: Set<number>,
    visited: Set<number>
): boolean {

    // Base Case 1: no cycle so 'far'
    if (visited.has(src)) {
        return true;
    }

    // Base Case 2: cycle
    if (visiting.has(src)) {
        return false;
    }

    // Base Case 3: reached the terminal node (check if it's the destination)
    const neighbors = adjList.get(src);
    if (neighbors.size === 0) {
        return src === dst;
    }

    // this placement is important
    visiting.add(src);

    for (const neighbor of neighbors) {

        if (backtrackDFS(neighbor, dst, adjList, visiting, visited) === false) {
            return false; // exit early if loop was found or terminal nodes is not the 'target'
        }

    }

    // Backtrack
    visiting.delete(src);
    visited.add(src);
    return true; 

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}