function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    return kahns(adjList);
};

function kahns(adjList: Map<number, Set<number>>): number[] {

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

    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return [];
    }

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [dst, src] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}