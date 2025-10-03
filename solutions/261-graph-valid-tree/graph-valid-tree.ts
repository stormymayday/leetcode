function validTree(n: number, edges: number[][]): boolean {
    const adjList = buildAdjList(n, edges);
    const visited = new Set<number>();
    const cycleDetected = bfs(0, adjList, visited, null);
    return cycleDetected && visited.size === n;
};

function bfs(node: number, adjList: Map<number, number[]>, visited: Set<number>, source: number | null): boolean {

    let queue: [number, number | null][] = [];
    queue.push([node, source]);
    visited.add(node);

    while(queue.length > 0) {

        const nextQueue: [number, number | null][] = [];
        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, prevNode] = queue[i];

            for(const neighbor of adjList.get(currNode)) {

                // Skipping the 'source' node to avoid 'trivial' cycles
                if(neighbor !== prevNode) {
                    if(!visited.has(neighbor)) {
                        visited.add(neighbor);
                        nextQueue.push([neighbor, currNode]);
                    } else {
                        // there is a cycle
                        return false
                    }
                }
            }
        }
        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return true; // no cycles

}

function buildAdjList(n: number, edges: number[][]): Map<number, number[]> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst] of edges) {
        adjList.get(src).push(dst);
        adjList.get(dst).push(src);
    }
    return adjList;
}