function eventualSafeNodes(graph: number[][]): number[] {

    const revAdjList = buildRevAdjList(graph);

    return reverseKahns(graph, revAdjList);

};

function buildRevAdjList(graph: number[][]): Map<number, Set<number>> {
    const revAdjList = new Map();
    for(let i = 0; i < graph.length; i += 1) {
        revAdjList.set(i, new Set());
    }
    for(let node = 0; node < graph.length; node += 1) {
        for(const neighbor of graph[node]) {
            revAdjList.get(neighbor).add(node);
        }
    }
    return revAdjList;
}

function reverseKahns(graph: number[][], revAdjList: Map<number, Set<number>>): number[] {

    const outDegreeMap = new Map<number, number>();
    for(let i = 0; i < graph.length; i += 1) {
        outDegreeMap.set(i, graph[i].length);
    }

    const ready: number[] = [];
    for(const [node, outDegreeCount] of outDegreeMap.entries()) {
        if(outDegreeCount === 0) {
            ready.push(node);
        }
    }

    const topOrder: number[] = [];
    while(ready.length > 0) {
        const currNode = ready.pop();
        topOrder.push(currNode);
        for(const parent of revAdjList.get(currNode)) {
            outDegreeMap.set(parent, outDegreeMap.get(parent) - 1);
            if(outDegreeMap.get(parent) === 0) {
                ready.push(parent);
            }
        }
    }
    return topOrder.sort((a, b) => a - b);
}