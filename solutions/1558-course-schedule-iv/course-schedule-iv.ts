function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {
    const adjList = buildAdjList(numCourses, prerequisites);
    const courseToPrereqs = kahnsAlgorithm(adjList);
    const result: boolean[] = [];
    for(const query of queries) {
        // const [u, v] = query;
        // Is u a prerequisite of v?
        const [prereq, course] = query;
        // result.push(courseToPrereqs.get(v).has(u));
        result.push(courseToPrereqs.get(course).has(prereq));
    }
    return result;
};

function kahnsAlgorithm(adjList: Map<number, Set<number>>): Map<number, Set<number>> {
    const courseToPrereqs = new Map<number, Set<number>>();
    const inDegree = new Map<number, number>();

    // Initialize
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
        courseToPrereqs.set(node, new Set());
    }

    // Build inDegree map
    for (const prereq of adjList.keys()) {
        for (const course of adjList.get(prereq)!) {
            inDegree.set(course, inDegree.get(course)! + 1);
        }
    }

    // Initialize queue with nodes that have no prerequisites
    const queue: number[] = [];
    for (const [course, degree] of inDegree.entries()) {
        if (degree === 0) queue.push(course);
    }

    while (queue.length > 0) {
        const prereq = queue.shift()!;

        for (const course of adjList.get(prereq)!) {
            // Add direct prerequisite
            courseToPrereqs.get(course)!.add(prereq);

            // Add all transitive prerequisites of the current prereq
            for (const pre of courseToPrereqs.get(prereq)!) {
                courseToPrereqs.get(course)!.add(pre);
            }

            // Decrease in-degree and enqueue if ready
            inDegree.set(course, inDegree.get(course)! - 1);
            if (inDegree.get(course) === 0) {
                queue.push(course);
            }
        }
    }

    return courseToPrereqs;
}

// function kahnsAlgorithm(adjList: Map<number, Set<number>>): Map<number, Set<number>> {
//     const courseToPrereqs = new Map<number, Set<number>>();
//     const inDegree = new Map<number, number>();
//     for(const node of adjList.keys()) {
//         inDegree.set(node, 0);
//         courseToPrereqs.set(node, new Set());
//     }
//     for(const prereq of adjList.keys()) {
//         for(const course of adjList.get(prereq)) {
//             inDegree.set(course, inDegree.get(course) + 1);
//         }
//     }

//     const queue: number[] = [];
//     for(const [course, count] of inDegree.entries()) {
//         if(count === 0) {
//             queue.push(course);
//         }
//     }

//     while(queue.length > 0) {
//         const prereq = queue.shift();
//         for(const course of adjList.get(prereq)) {
//             courseToPrereqs.get(course).add(prereq);
//             inDegree.set(course, inDegree.get(course) - 1);
//             if(inDegree.get(course) === 0) {
//                 queue.push(course);
//             }
//         }
//     }
//     return courseToPrereqs;
// }

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