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
            res.push(-1);
        } else if (src === dst) {
            res.push(1);
        } else {
            res.push(dfs(src, dst, adjList, new Set<string>()));
        }
    }
    return res;
};

function dfs(src: string, dst: string, adjList: Map<string, [string, number][]>, visited: Set<string>): number {

    // Base Case: reached destination
    if (src === dst) {
        return 1;
    }

    // Cycle ? 
    // if (visited.has(src)) {
    //     return -1;
    // }

    

    for (const [neighbor, weight] of adjList.get(src)) {
        if (!visited.has(neighbor)) {
            visited.add(neighbor);
            const res: number = dfs(neighbor, dst, adjList, visited);
            if (res !== - 1) {
                return res * weight;
            }
        }

    }

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