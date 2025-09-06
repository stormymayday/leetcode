function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): number[] {

    // 1. inDegree map
    const inDegreeMap = new Map<number, number>();
    for(const node of adjList.keys()) { // O(V)
        inDegreeMap.set(node, 0);
    }
    for(const node of adjList.keys()) { // O(V + E)
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. 'ready' queue / stack
    const ready: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }

    // 3. Kahn's BFS
    const topOrder: number[] = [];
    while(ready.length > 0) {
        const currNode = ready.pop();
        topOrder.push(currNode);
        for(const neighbor of adjList.get(currNode)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if(inDegreeMap.get(neighbor) === 0) {
                ready.push(neighbor);
            }
        }
    }

    // 4. Cycle check & return
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return [];
    }

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) { // O(V)
        adjList.set(i, new Set());
    }
    for(const [dst, src] of edges) { // O(E)
        adjList.get(src).add(dst);
    }
    return adjList;
    // Time: O(V + E)
    // Space: O(V + E)
}