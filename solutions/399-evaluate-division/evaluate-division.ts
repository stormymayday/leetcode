function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {

    const n = equations.length;

    // 1. Combine equations and values into an edge list
    // (Can skip this and build adjList right away)
    const edgeList: [string, string, number][] = [];
    for (let i = 0; i < n; i += 1) {
        const [src, dst] = equations[i];
        const weight = values[i];
        edgeList.push([src, dst, weight]);
    }

    // 2. Build a weighted adjacency list
    const weightedAdjList: Map<string, [string, number][]> = buildWeightedAdjList(edgeList);

    // 3. Run BFS on every query and rill the result
    const res: number[] = [];
    for (const [src, dst] of queries) {
        res.push(bfs(src, dst, weightedAdjList, new Set()));
    }
    return res;

};

function bfs(src: string, dst: string, adjList: Map<string, [string, number][]>, visited: Set<string>): number {
    // If either variable doesn't exist in our graph, return -1
    if (!adjList.has(src) || !adjList.has(dst)) {
        return -1.0;
    }

    const queue: [string, number][] = [];
    queue.push([src, 1]);

    while (queue.length > 0) {
        const [currNode, currWeight] = queue.shift();
        if (currNode === dst) {
            return currWeight;
        }
        for(const [neighbor, neighborWeight] of adjList.get(currNode)) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, currWeight * neighborWeight]);
            }
        }
    }
    // There is no path from src to dst
    return -1;
}

function buildWeightedAdjList(edgeList: [string, string, number][]): Map<string, [string, number][]> {
    const adjList = new Map();
    for (const [src, dst, weight] of edgeList) {
        if (!adjList.has(src)) {
            adjList.set(src, []);
        }
        if (!adjList.has(dst)) {
            adjList.set(dst, []);
        }
        adjList.get(src).push([dst, weight]);
        adjList.get(dst).push([src, 1 / weight]);
    }
    return adjList;
}