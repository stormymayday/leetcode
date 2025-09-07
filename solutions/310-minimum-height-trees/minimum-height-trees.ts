function findMinHeightTrees(n: number, edges: number[][]): number[] {

    // Edge Case: single node -> no edges
    if (n === 1 || edges.length === 0) {
        return [0];
    }

    const adjList = buildAdjList(n, edges);

    return kahns(adjList);

};

function kahns(adjList: Map<number, Set<number>>): number[] {
    const inDegreeMap = new Map<number, number>();
    for (const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    let ready: number[] = [];
    for (const [node, inDegreeCount] of inDegreeMap.entries()) {
        if (inDegreeCount === 1) {
            ready.push(node);
        }
    }

    let nodesRemaining = adjList.size;
    while (nodesRemaining > 2) {

        const queueLength = ready.length;
        const nextLayerNodes: number[] = [];

        for (let i = 0; i < queueLength; i += 1) {

            const currNode = ready.pop();
            nodesRemaining -= 1;

            for (const neighbor of adjList.get(currNode)) {
                inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);

                // if (inDegreeMap.get(neighbor) === 0) {
                //     inDegreeMap.delete(neighbor);
                // }

                if (inDegreeMap.get(neighbor) === 1) {
                    nextLayerNodes.push(neighbor);
                }
            }

        }

        ready = nextLayerNodes;

    }

    return ready;

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [a, b] of edges) {
        adjList.get(a).add(b);
        adjList.get(b).add(a);
    }
    return adjList;
}