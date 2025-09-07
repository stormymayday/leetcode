function minimumSemesters(n: number, relations: number[][]): number {
    
    const adjList = buildAdjList(n, relations);

    return kahns(adjList);

};

function kahns(adjList: Map<number, Set<number>>): number {
    const inDegreeMap = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    let ready: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }

    let nodesVisited = 0;
    let levels = 1;
    while(ready.length > 0) {

        const queueLength = ready.length;
        const nextLevelNodes: number[] = [];

        for(let i = 0; i < queueLength; i += 1) {
            const currNode = ready.pop();
            nodesVisited += 1;
            for(const neighbor of adjList.get(currNode)) {
                inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
                if(inDegreeMap.get(neighbor) === 0) {
                    nextLevelNodes.push(neighbor);
                }
            }

        }

        if(nextLevelNodes.length > 0) {
            ready = nextLevelNodes;
            levels += 1;
        } else {
            break;
        }

    }

    if(nodesVisited === adjList.size) {
        return levels;
    } else {
        return -1;
    }
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}