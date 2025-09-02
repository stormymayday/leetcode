function minimumSemesters(n: number, relations: number[][]): number {

    const adjList = buildAdjList(n, relations);

    return kahns(adjList);

};

function kahns(adjList: Map<number, Set<number>>): number {

    // 1. Initialzie the inDegree hash map
    const inDegree = new Map<number, number>();
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialze the 'ready' queue
    let queue: number[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            queue.push(node);
        }
    }

    // 3. BFS
    const topOrder: number[] = [];
    let levels = 1; // counting enqueued nodes
    while (queue.length > 0) {

        const queueLength = queue.length;
        const nextLevelNodes: number[] = [];

        for (let i = 0; i < queueLength; i += 1) {

            const currNode = queue.shift();
            topOrder.push(currNode);

            for(const neighbor of adjList.get(currNode)) {

                inDegree.set(neighbor, inDegree.get(neighbor) - 1);
                if(inDegree.get(neighbor) === 0) {
                    nextLevelNodes.push(neighbor);
                }

            }

        }

        if (nextLevelNodes.length > 0) {
            queue = nextLevelNodes;
            levels += 1;
        } else {
            break;
        }

    }

    if (topOrder.length === adjList.size) {
        return levels;
    } else {
        return -1;
    }

}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const adjList = new Map();
    for (let i = 1; i <= n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}