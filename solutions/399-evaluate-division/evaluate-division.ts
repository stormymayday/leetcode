function calcEquation(equations: string[][], values: number[], queries: string[][]): number[] {
    const adjList = buildAdjList(equations, values);
    const result = [];
    for(const query of queries) {
        const [a, b] = query;
        result.push(bfs(adjList, a, b, new Set()));
    }
    return result;
};

function bfs(adjList, src, dst, visited) {
    if(!adjList.has(src) || !adjList.has(dst)) {
        return -1;
    }
    visited.add(src);
    const queue: [string, number][] = [];
    queue.push([src, 1]);
    while(queue.length > 0) {
        const [current, totalWeight] = queue.shift();
        if(current === dst) {
            return totalWeight;
        }
        for(const [neighbor, weight] of adjList.get(current)) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, totalWeight * weight]);
            }
        }
    }
    return -1;
}

function buildAdjList(equations: string[][], values: number[]): Map<string, [string, number][]> {
    const adjList = new Map();
    for(let i = 0; i < equations.length; i += 1) {
        const [x, y] = equations[i];
        const value = values[i];
        if(!adjList.has(x)) {
            adjList.set(x, []);
        }
        if(!adjList.has(y)) {
            adjList.set(y, []);
        }
        adjList.get(x).push([y, value]);
        adjList.get(y).push([x, 1/value]);
    }
    return adjList;
}