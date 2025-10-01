function minimumSemesters(n: number, relations: number[][]): number {
    
    const adjList = buildAdjList(n, relations);

    return kahnsBFS(adjList);

};

function kahnsBFS(adjList: Map<number, number[]>): number {

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

    const topOrder: number[] = [];
    let layers = 1;
    while(ready.length > 0) {

        const nextQueue: number[] = [];
        for(let i = 0; i < ready.length; i += 1) {
            const curr = ready[i];
            topOrder.push(curr);
            for(const neighbor of adjList.get(curr)) {
                inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
                if(inDegreeMap.get(neighbor) === 0) {
                    nextQueue.push(neighbor);
                }
            }
        }
        if(nextQueue.length > 0) {
            ready = nextQueue;
            layers += 1;
        } else {
            break;
        }
    }

    if(topOrder.length === adjList.size) {
        return layers;
    } else {
        return -1;
    }

}

function buildAdjList(n: number, edges: number[][]): Map<number, number[]> {
    const adjList = new Map();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst] of edges) {
        adjList.get(src).push(dst);
    }
    return adjList;
}