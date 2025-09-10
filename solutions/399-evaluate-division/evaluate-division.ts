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

    // 3. Run DFS on every query and rill the result
    const res: number[] = [];
    for (const [src, dst] of queries) {
        res.push(dfs(src, dst, weightedAdjList, new Set()));
    }
    return res;

};

function dfs(src: string, dst: string, adjList: Map<string, [string, number][]>, visited: Set<string>): number {
    // If either variable doesn't exist in our graph, return -1
    if (!adjList.has(src) || !adjList.has(dst)) {
        return -1.0;
    }

    // If src and dst are the same, return 1 (x/x = 1)
    if (src === dst) {
        return 1.0;
    }

    // Mark current node as visited
    visited.add(src);

    // Explore all neighbors
    const neighbors = adjList.get(src)!;
    for (const [neighbor, weight] of neighbors) {
        if (!visited.has(neighbor)) {
            // Recursively search for path to destination
            const result = dfs(neighbor, dst, adjList, visited);
            if (result !== -1.0) {
                // Found a path! Return the accumulated weight
                return weight * result;
            }
        }
    }

    // Clean up visited set and return -1 if no path found
    visited.delete(src);
    return -1.0;
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