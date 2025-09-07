function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    
    const adjList = buildAdjList(numCourses, prerequisites);

    const courseToPrereqs = kahns(adjList);

    const res: boolean[] = [];
    if(courseToPrereqs !== undefined) {
        for(const [prereq, course] of queries) {
            res.push(courseToPrereqs.get(course).has(prereq));
        }
    }
    return res;

};


// Returns course to prereqs hash map
function kahns(adjList: Map<number, Set<number>>): Map<number, Set<number>> | undefined {

    // 1. inDegree & course to prereqs hash maps
    const inDegreeMap = new Map<number, number>();
    const courseToPrereqs = new Map<number, Set<number>>();
    for(const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
        courseToPrereqs.set(node, new Set());
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. 'ready' queue / stack
    const ready: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }

    // 3. Kahn's BFS
    let nodesVisited = 0;
    while(ready.length > 0) {

        const currNode = ready.pop();
        nodesVisited += 1;

        for(const neighbor of adjList.get(currNode)) {

            // Direct prerequisites
            courseToPrereqs.get(neighbor).add(currNode);

            // Indirect prereqs
            for(const prereq of courseToPrereqs.get(currNode)) {
                courseToPrereqs.get(neighbor).add(prereq);
            }
            
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if(inDegreeMap.get(neighbor) === 0) {
                ready.push(neighbor);
            }
        }

    }

    // 4. Cycle check & return
    if(nodesVisited === adjList.size) {
        return courseToPrereqs;
    } else {
        return undefined;
    }

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}