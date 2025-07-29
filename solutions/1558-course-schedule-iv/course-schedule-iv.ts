function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const adjList = buildAdjList(numCourses, prerequisites);

    const prereqForCourses = new Map<number, Set<number>>();
    for(const prereq of adjList.keys()) {
        dfs(adjList, prereq, prereqForCourses);
    }

    const result: boolean[] = [];
    for(const query of queries) {
        const [prereq, course] = query;
        result.push(prereqForCourses.get(prereq).has(course));
    }
    return result;
};

function dfs(adjList: Map<number, Set<number>>, src: number, prereqForCourses: Map<number, Set<number>>): Set<number> {
    
    if(prereqForCourses.has(src)) {
        return prereqForCourses.get(src);
    }

    const allCourses = new Set<number>();

    for(const directCourse of adjList.get(src)) {
        allCourses.add(directCourse);
        const indirectCourses = dfs(adjList, directCourse, prereqForCourses);
        for(const indirectCourse of indirectCourses) {
            allCourses.add(indirectCourse);
        }
    }

    prereqForCourses.set(src, allCourses);
    return allCourses;
    
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