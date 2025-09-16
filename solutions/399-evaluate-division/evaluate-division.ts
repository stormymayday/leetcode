function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {

    const edgeList: [string, string, number][] = [];
    for (let i = 0; i < equations.length; i += 1) {
        const [src, dst] = equations[i];
        const weight = values[i];
        edgeList.push([src, dst, weight]);
    }

    const adjList = buildAdjList(edgeList);

    const res: number[] = [];
    for (const [src, dst] of queries) {
        if (!adjList.has(src) || !adjList.has(dst)) {
            res.push(-1.0);
        } else if (src === dst) {
            res.push(1.0);
        } else {
            res.push(bfs(src, dst, adjList, new Set<string>()));
        }
    }
    return res;
};

function bfs(src: string, dst: string, adjList: Map<string, [string, number][]>, visited: Set<string>): number {

    const queue: [string, number][] = [];
    queue.push([src, 1.0]);
    visited.add(src);

    while(queue.length > 0) {
        const [currNode, currWeight] = queue.shift();
        if(currNode === dst) {
            return currWeight;
        }
        for(const [neighbor, neighborWeight] of adjList.get(currNode)) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, currWeight * neighborWeight]);
            }
        }
    }
    // Path not found
    return -1;
}

function buildAdjList(edgeList: [string, string, number][]): Map<string, [string, number][]> {
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