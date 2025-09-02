function minimumSemesters(n: number, relations: number[][]): number {

    const adjList = buildAdjList(n, relations);

    return kahns(adjList);

};

function kahns(adjList: Map<number, Set<number>>): number {

    // 1. Build inDegree hash map
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialze a 'ready' queue
    let queue: number[] = [];
    for(const [node, inDegreeCount] of inDegree.entries()) {
        if(inDegreeCount === 0) {
            queue.push(node);
        }
    }

    // 3. Kahn's (BFS)
    const topOrder: number[] = [];
    let levels = 1; // count one already queued up
    while(queue.length > 0) {

        const queueLength = queue.length;
        const nextLayerQueue: number[] = [];

        for(let i = 0; i < queueLength; i += 1) {

            const currNode = queue.shift();
            topOrder.push(currNode);
            for(const neighbor of adjList.get(currNode)) {
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if(inDegree.get(neighbor) === 0) {
                    nextLayerQueue.push(neighbor);
                }
            }

        }

        if(nextLayerQueue.length > 0) {
            queue = nextLayerQueue;
            levels += 1;
        } else {
            break;
        }

    }

    // 4. Cycle Check
    if(topOrder.length === adjList.size) {
        return levels;
    } else {
        return -1;
    }
}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const adjList = new Map<number, Set<number>>();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}