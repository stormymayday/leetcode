function possibleBipartition(n: number, dislikes: number[][]): boolean {

    const adjList = buildAdjList(n, dislikes);
    const colorMap = new Map<number, boolean>();

    // Check each node (graph may have disconnected components)
    for (const node of adjList.keys()) {
        // Skip already colored nodes
        if (!colorMap.has(node)) { // this check is important to avoid false negatives
            if (bfs(node, adjList, colorMap, true) === false) {
                // if any of the calls return false, exit early
                return false;
            }
        }
    }

    // Otherwise, graph must be bipartite
    return true;

};

function bfs(src: number, adjList: Map<number, number[]>, colorMap: Map<number, boolean>, nodeColor: boolean): boolean {

    // Extra check. However, bfs should not be called if a 'node' is in 'colorMap'
    if (colorMap.has(src) && colorMap.get(src) !== nodeColor) {
        return false;
    }

    colorMap.set(src, nodeColor);

    let queue: [number, boolean][] = [];
    queue.push([src, nodeColor]);

    while (queue.length > 0) {

        const nextQueue: [number, boolean][] = [];
        for (let i = 0; i < queue.length; i += 1) {

            const [currNode, currColor] = queue[i];

            for (const neighbor of adjList.get(currNode)) {
                
                // try 'coloring' the neighbor
                if (!colorMap.has(neighbor)) {
                    colorMap.set(neighbor, !currColor);
                    nextQueue.push([neighbor, !currColor]);
                } else {
                    // Neighbor has been visited, check the color
                    if(colorMap.get(neighbor) === currColor) {
                        // exit early if parent has the same color
                        return false;
                    }
                }

            }

        }
        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
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