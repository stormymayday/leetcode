function findOrder(numCourses: number, prerequisites: number[][]): number[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    const visiting = new Set<number>();
    const visited = new Set<number>();
    const topOrder: number[] = [];
    for(const node of adjList.keys()) {
        if(postOrderDFS_WhiteGrayBlack(adjList, node, visiting, visited, topOrder) === true) {
            return []; // cycle => topological ordering is not possible
        }
    }
    return topOrder.reverse();
};

function postOrderDFS_WhiteGrayBlack(adjList: Map<number, Set<number>>, src: number, visiting: Set<number>, visited: Set<number>, topOrder: number[]): boolean {
    if(visited.has(src)) {
        return false; // no cycle
    }
    if(visiting.has(src)) {
        return true; // cycle
    }
    visiting.add(src);
    for(const neighbor of adjList.get(src)) {
        if(postOrderDFS_WhiteGrayBlack(adjList, neighbor, visiting, visited, topOrder) === true) {
            return true; // cycle => exit
        }
    }
    visiting.delete(src);
    visited.add(src);
    topOrder.push(src);
    return false; // no cycle
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1){
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [course, prereq] = edge;
        adjList.get(prereq).add(course);
    }
    return adjList;
}