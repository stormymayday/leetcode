function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const adjList = buildAdjList(n, edges);
    return dfs(adjList, source, destination, new Set());
    // return bfs(adjList, source, destination, new Set());
};

function bfs(adjList, src, dst, visited) {

    // adding source right away to prevent it from being re-queued if it appears as a neighbor of other nodes
    visited.add(src);

    const queue = [src];

    while(queue.length > 0) {
        const current = queue.shift();

        if(current === dst) {
            return true;
        }

        for(const neighbor of adjList.get(current)) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }

    }

    return false;

}

function dfs(adjList, src, dst, visited) {

    // if(visited.has(src)) {
    //     return false;
    // }

    if(src === dst) {
        return true;
    }

    // visited.add(src);

    for(const neighbor of adjList.get(src)) {
        if(!visited.has(neighbor)) {
            visited.add(neighbor);
            if(dfs(adjList, neighbor, dst, visited) === true) {
                return true;
            }
        }
    }

    return false;
}

function buildAdjList(n: number, edges:number[][]):Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}