function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {

    const adjList = buildAdjList(numCourses, prerequisites);

    const nodePrereqs: Map<number, Set<number>> | undefined = kahns(adjList);

    const res: boolean[] = [];
    // Cycle Detection (should not be necessary)
    // if(nodePrereqs !== undefined) {
    for (const [prereq, node] of queries) {
        res.push(nodePrereqs.get(node).has(prereq));
    }
    // } else {
    return res;
    // }

};

function kahns(adjList: Map<number, Set<number>>): Map<number, Set<number>> | undefined {

    // 1. Initialze inDegree and nodePrereqs hash maps
    const inDegree = new Map<number, number>();
    const nodePrereqs = new Map<number, Set<number>>();
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
        nodePrereqs.set(node, new Set());
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialze the 'ready' queue
    const queue: number[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            queue.push(node);
        }
    }

    // 3. Kahn's (BFS)
    const topOrder: number[] = [];
    while (queue.length > 0) {

        const currNode = queue.shift();
        topOrder.push(currNode);

        for (const neighbor of adjList.get(currNode)) {

            // Direct prereq
            nodePrereqs.get(neighbor).add(currNode)

            // Prereqs of a prereq (currNode)
            for (const prereq of nodePrereqs.get(currNode)) {
                nodePrereqs.get(neighbor).add(prereq);
            }

            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }

        }

    }

    // 4. Cycle check (should not be necessary)
    // if(topOrder.length === adjList.size) {
    return nodePrereqs;
    // } else {
    //     return undefined;
    // }

}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const adjList = new Map<number, Set<number>>();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}