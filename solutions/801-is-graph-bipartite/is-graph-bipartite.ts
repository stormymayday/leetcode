function isBipartite(graph: number[][]): boolean {

    const colorMap = new Map<number, boolean>();

    // Check each node (graph may have disconnected components)
    for(let i = 0; i < graph.length; i += 1) {
        // Skip already colored nodes
        if(!colorMap.has(i)) { // this check is important to avoid false negatives
            if(bfs(i, graph, colorMap, true) === false) {
                // if any of the calls return false, exit early
                return false;
            }
        }
    }

    // Otherwise, graph must be bipartite
    return true;   
};

function bfs(src: number, graph: number[][], colorMap: Map<number, boolean>, nodeColor: boolean): boolean {

    let queue: [number, boolean][] = [];
    queue.push([src, nodeColor]);

    while(queue.length > 0) {

        const nextQueue: [number, boolean][] = [];
        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, currColor] = queue[i];

            if(colorMap.has(currNode) && colorMap.get(currNode) !== currColor) {
                return false;
            }

            colorMap.set(currNode, currColor);

            for(const neighbor of graph[currNode]) {

                if(!colorMap.has(neighbor)) {
                    nextQueue.push([neighbor, !currColor]);
                }

            }

        }
        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }
    }
    return true;
}

function dfs(src: number, graph: number[][], colorMap: Map<number, boolean>, currColor: boolean): boolean {
    // Base Case: if node has been colored
    if(colorMap.has(src)) {
        // it must be equal to 'currColor'
        return colorMap.get(src) === currColor; // true or false
    }

    // Otherwise, 'color' current node
    colorMap.set(src, currColor);

    // Try to color all neighbors with opposite color
    for(const neighbor of graph[src]) {
        // If any of the calls return 'false', exit early
        if(dfs(neighbor, graph, colorMap, !currColor) === false) {
            return false;
        }
    }

    // If none of the neighbors return 'false', then return 'true'
    return true;
}