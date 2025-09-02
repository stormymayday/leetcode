function checkIfPrerequisite(numCourses: number, prerequisites: number[][], queries: number[][]): boolean[] {

    const adjList = buildAdjList(numCourses, prerequisites);
    const nodePrereqs = kahns(adjList);

    const res: boolean[] = [];
    for(const [prereq, node] of queries) {
        res.push(nodePrereqs.get(node).has(prereq));
    }
    return res;
};

function kahns(adjList: Map<number, Set<number>>): Map<number, Set<number>> {

    // 1. Build inDegree hash map & Initialze nodePrereqs hash map
    const inDegree = new Map<number, number>();
    const nodePrereqs = new Map<number, Set<number>>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
        nodePrereqs.set(node, new Set());
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialize 'ready' stack
    const stack: number[] = [];
    for(const [node, inDegreeCount] of inDegree.entries()) {
        if(inDegreeCount === 0) {
            stack.push(node);
        }
    }

    // 3. BFS
    while(stack.length > 0) {
        const currNode = stack.pop();
        for(const neighbor of adjList.get(currNode)) {
            
            // *********** Prereq Logic ***********
            // Store direct prereq
            nodePrereqs.get(neighbor).add(currNode);

            // Store all prereqs of the prereq (currNode)
            for(const prereq of nodePrereqs.get(currNode)) {
                nodePrereqs.get(neighbor).add(prereq)
            }
            // *********** Prereq Logic ***********

            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }

        }
    }

    return nodePrereqs;

}

function buildAdjList(n, edges): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}