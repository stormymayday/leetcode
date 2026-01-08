function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {

    const adjList = buildAdjList(n, edges);

    const inDegreeMap = buildInDegreeMap(n, adjList);

    const readyQueue: number[] = [];

    for (const [node, inDegreeCount] of inDegreeMap.entries()) {
        if (inDegreeCount === 0) {
            readyQueue.push(node);
        }
    }

    return readyQueue;
};

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

function buildInDegreeMap(n: number, adjList: Map<number, Set<number>>): Map<number, number> {

    const inDegreeMap = new Map<number, number>();

    for (let i = 0; i < n; i += 1) {
        inDegreeMap.set(i, 0);
    }

    for (let i = 0; i < n; i += 1) {
        for (const neighbor of adjList.get(i)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    return inDegreeMap;

}