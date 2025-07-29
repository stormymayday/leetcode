function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    const result: boolean[] = [];
    for(const query of queries) {
        const [prereq, course] = query;
        result.push(dfs(adjList, prereq, course, new Set<number>()));
    }
    return result;
};

function dfs(adjList: Map<number, Set<number>>, src: number, dst: number, visited: Set<number>): boolean {
    if(visited.has(src)) {
        return false;
    }
    if(src === dst) {
        return true;
    }
    visited.add(src);
    for(const neighbor of adjList.get(src)) {
        if(dfs(adjList, neighbor, dst, visited) === true) {
            return true;
        }
    }
    return false;
}

function buildAdjList(n: number, edges: number[][]):Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const edge of edges) {
        const [src, dst] = edge;
        adjList.get(src).add(dst);
    }
    return adjList;
}