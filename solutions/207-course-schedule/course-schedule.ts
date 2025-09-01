function canFinish(numCourses: number, prerequisites: number[][]): boolean {
    
    // 1. Create an adjacency list and inDegreeMap
    const  adjList = new Map<number, Set<number>>();
    const inDegreeMap = new Map<number, number>();
    for(let i = 0; i < numCourses; i += 1) {
        adjList.set(i, new Set());
        inDegreeMap.set(i, 0);
    }
    for(const [dst, src] of prerequisites) {
        adjList.get(src).add(dst);
    }
    for(let i = 0; i < numCourses; i += 1) {
        for(const neighbor of adjList.get(i)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. Initialzie 'ready' queue / stack
    const queue: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            queue.push(node);
        }
    }

    // 3. Kahn's (BFS)
    let nodesVisited: number = 0;
    while(queue.length > 0) {
        const currNode = queue.shift();
        nodesVisited += 1;
        for(const neighbor of adjList.get(currNode)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if(inDegreeMap.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 4. Cycle check
    return nodesVisited === numCourses;

};