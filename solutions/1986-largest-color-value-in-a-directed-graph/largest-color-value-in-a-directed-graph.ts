function largestPathValue(colors: string, edges: number[][]): number {

    const adjList = buildAdjList(colors.length, edges);

    return kahns(adjList, colors);

};

function kahns(adjList: Map<number, Set<number>>, colors: string): number {

    // 1. in-degree and maxColorCounts map initializations
    const inDegreeMap = new Map<number, number>();
    const maxColorCountAtNode = new Map<number, number[]>(); // key: nodeId -> val: array length of 26 (representing characters) filled with zeroes
    for (const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
        maxColorCountAtNode.set(node, new Array(26).fill(0));
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. 'ready' queue / stack
    const ready: number[] = [];
    for (const [node, inDegreeCount] of inDegreeMap.entries()) {
        if (inDegreeCount === 0) {
            ready.push(node);

            // Setting nodes own color count to 1
            const colorIdx = colors.charCodeAt(node) - 'a'.charCodeAt(0);
            maxColorCountAtNode.get(node)[colorIdx] = 1;
        }
    }

    // 3. Kahn's BFS
    let maxColorCount = 0;
    let nodesVisited = 0;
    while (ready.length > 0) {

        const currNode = ready.pop();
        nodesVisited += 1;

        // Updating maxColorCount vs current Node's maxColorCounts
        for (let colorIdx = 0; colorIdx < 26; colorIdx += 1) {
            maxColorCount = Math.max(maxColorCount, maxColorCountAtNode.get(currNode)[colorIdx]);
        }

        for (const neighbor of adjList.get(currNode)) {

            // Propogating current Node's maxColorCounts to it's neighbors
            for (let colorIdx = 0; colorIdx < 26; colorIdx += 1) {

                maxColorCountAtNode.get(neighbor)[colorIdx] = Math.max(
                    maxColorCountAtNode.get(currNode)[colorIdx],
                    maxColorCountAtNode.get(neighbor)[colorIdx],
                );

            }

            // Updating the inDegreeMap
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if (inDegreeMap.get(neighbor) === 0) {
                ready.push(neighbor);

                // Incrementing nodes own color count by 1
                const colorIdx = colors.charCodeAt(neighbor) - 'a'.charCodeAt(0);
                maxColorCountAtNode.get(neighbor)[colorIdx] += 1;
            }

        }

    }

    // 4. Cycle check and return
    if (nodesVisited === colors.length) {
        return maxColorCount;
    } else {
        return -1; // cycle
    }

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for (const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}