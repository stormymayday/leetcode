function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    
    const visiting = new Set<number>();
    const visited = new Set<number>();
    const topOrder: number[] = [];
    for(let i = 0; i < numCourses; i += 1) {
        if(!visited.has(i)) {
            if(postOrderDFS(i, adjList, visiting, visited, topOrder) == false) {
                return [];
            }
        }
    }
    return topOrder.reverse();
};

function postOrderDFS(node: number, adjList: Map<number, Set<number>>, visiting: Set<number>, visited :Set<number>, topOrder: number[]): boolean {
    if(visited.has(node)) {
        return true;
    }
    if(visiting.has(node)) {
        return false;
    }
    visiting.add(node);
    for(const neighbor of adjList.get(node)) {
        if(postOrderDFS(neighbor, adjList, visiting, visited, topOrder) == false) {
            return false;
        }
    }
    visiting.delete(node);
    visited.add(node);
    topOrder.push(node);
    return true;
}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [dst, src] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
};