function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const adjList = buildAdjList(numCourses, prerequisites);

    const prereqForCourses = new Map<number, Set<number>>();
    for(const course of adjList.keys()) {
        dfs(adjList, course, prereqForCourses);
    }

    let result: boolean[] = [];
    for(const query of queries) {
        const [src, dst] = query;
        // result.push(dfs(adjList, src, dst, new Set()));
        result.push(prereqForCourses.get(src).has(dst));
    }
    return result;
};

function dfs(adjList: Map<number, Set<number>>, src: number, prereqForCourses: Map<number, Set<number>>):Set<number> {

    if (prereqForCourses.has(src)) {
        return prereqForCourses.get(src)!;
    }

    const prereqs = new Set<number>();

    for (const neighbor of adjList.get(src)!) {
        prereqs.add(neighbor);
        const neighborPrereqs = dfs(adjList, neighbor, prereqForCourses);
        for (const p of neighborPrereqs) {
            prereqs.add(p);
        }
    }

    prereqForCourses.set(src, prereqs);
    return prereqs;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
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
