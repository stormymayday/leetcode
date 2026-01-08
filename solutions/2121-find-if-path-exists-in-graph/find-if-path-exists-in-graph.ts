function validPath(n: number, edges: number[][], source: number, destination: number): boolean {

    const adjList = buildAdjList(n, edges);

    return dfs(adjList, source, destination, new Set<number>());

};

function dfs(adjList: Map<number, number[]>, src: number, target: number, visited: Set<number>): boolean {

    if (src === target) {
        return true;
    }

    if(visited.has(src)) {
        return false;
    }

    visited.add(src);

    for (const neighbor of adjList.get(src)) {

        if (dfs(adjList, neighbor, target, visited) === true) {
            return true;
        }

    }

    return false;

}

function buildAdjList(n: number, edges: number[][]): Map<number, number[]> {

    const adjList = new Map();

    for (let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }

    for (const [src, dst] of edges) {

        adjList.get(src).push(dst);
        adjList.get(dst).push(src);
    }

    return adjList;
}