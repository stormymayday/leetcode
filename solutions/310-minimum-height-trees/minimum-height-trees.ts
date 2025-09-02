function findMinHeightTrees(n: number, edges: number[][]): number[] {
    
    // 1. Edge case: single node
    if(n === 1 || edges.length === 0) {
        return [0];
    }

    const adjList = buildAdjList(n, edges);

    return kahns(adjList);

};

function kahns(adjList: Map<number, Set<number>>): number[] {

    // 1. Build inDegree (leaves) hash map
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Queue up the "leaves" inDegree of 1
    let queue: number[] = [];
    for(const [node, inDegreeCount] of inDegree.entries()) {
        if(inDegreeCount === 1) {
            queue.push(node);
        }
    }

    // 3. Kahn's BFS
    let nodesLeft = adjList.size;
    while(nodesLeft > 2) {
        
        const queueLength = queue.length;
        nodesLeft -= queueLength;
        const nextLayer: number[] = [];

        for(let i = 0; i < queueLength; i += 1) {
            const currNode = queue.shift();
            for(const neighbor of adjList.get(currNode)) {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if(inDegree.get(neighbor) === 0) {
                    inDegree.delete(neighbor);
                }
                if(inDegree.get(neighbor) === 1) {
                    nextLayer.push(neighbor);
                }
            }
        }

        queue = nextLayer;

    }

    return queue;

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map<number, Set<number>>();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}