function validPath(n: number, edges: number[][], source: number, destination: number): boolean {
    const adjList = buildAdjList(n, edges);
    return bfs(adjList, source, destination, new Set<number>());
};

function bfs(adjList: Map<number, Set<number>>, src: number, dst: number, visited: Set<number>):boolean {
    const queue: number[] = [];
    queue.push(src);
    visited.add(src);
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

function buildAdjList(n:number, edges: number[][]):Map<number, Set<number>> {
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