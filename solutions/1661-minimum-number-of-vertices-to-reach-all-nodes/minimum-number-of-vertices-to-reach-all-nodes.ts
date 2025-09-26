function findSmallestSetOfVertices(n: number, edges: number[][]): number[] {
    
    const adjList = buildAdjList(n, edges);

    const inDegreeMap = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    const ready: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }
    return ready;
};

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}