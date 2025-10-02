function possibleBipartition(n: number, dislikes: number[][]): boolean {

    const adjList = buildAdjList(n, dislikes);
    const colorMap = new Map<number, boolean>();

    // Check each node (graph may have disconnected components)
    for (const node of adjList.keys()) {
        // Skip already colored nodes
        if (!colorMap.has(node)) { // this check is important to avoid false negatives
            if (dfs(node, adjList, colorMap, true) === false) {
                // if any of the calls return false, exit early
                return false;
            }
        }
    }

    // Otherwise, graph must be bipartite
    return true;

};

function dfs(src: number, adjList: Map<number, number[]>, colorMap: Map<number, boolean>, nodeColor: boolean): boolean {

    // Base Case: src is already 'colored' / 'visited'
    if(colorMap.has(src)) {
        // Must be the same color
        return colorMap.get(src) === nodeColor;
    }

    colorMap.set(src, nodeColor);

    for(const neighbor of adjList.get(src)) {
        if(dfs(neighbor, adjList, colorMap, !nodeColor) === false) {
            return false;
        }
    }

    return true;
}

function buildAdjList(n: number, edges: number[][]): Map<number, number[]> {
    const adjList = new Map();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst] of edges) {
        adjList.get(src).push(dst);
        adjList.get(dst).push(src);
    }
    return adjList;
}