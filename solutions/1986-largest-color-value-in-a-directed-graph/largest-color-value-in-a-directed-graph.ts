function largestPathValue(colors: string, edges: number[][]): number {

    const n = colors.length;

    const adjList = buildAdjList(n, edges);

    return kahns(adjList, colors);

}

function kahns(adjList: Map<number, Set<number>>, colors: string): number {

    // 1. Initialze the inDegree map and colorCount map
    const inDegree = new Map<number, number>();
    const colorCounts = new Map<number, number[]>();
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
        colorCounts.set(node, new Array(26).fill(0));
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialze the 'ready' queue / stack
    const stack: number[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            stack.push(node);
            // KEY: Initialize source nodes with their color count = 1
            const colorIndex = colors.charCodeAt(node) - 'a'.charCodeAt(0);
            colorCounts.get(node)[colorIndex] = 1;
        }

    }

    // 4. Kahn's algorithm with color count propagation
    let nodesVisited = 0;
    let maxColorCount = 0;
    while (stack.length > 0) {

        const currNode = stack.pop();

        nodesVisited += 1;

        for (const neighbor of adjList.get(currNode)) {

            // Propagate maximum color counts from current node to neighbor
            for (let c = 0; c < 26; c++) {
                colorCounts.get(neighbor)[c] = Math.max(
                    colorCounts.get(neighbor)[c],
                    colorCounts.get(currNode)[c]
                );
            }

            // Decrease neighbor's indegree
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                // KEY: Increment neighbor's own color count when it becomes ready
                const neighborColorIndex = colors.charCodeAt(neighbor) - 'a'.charCodeAt(0);
                colorCounts.get(neighbor)[neighborColorIndex]++;
                stack.push(neighbor);
            }
        }

        // Track maximum color count seen so far
        for (let c = 0; c < 26; c++) {
            maxColorCount = Math.max(maxColorCount, colorCounts.get(currNode)[c]);
        }

    }

    return nodesVisited === adjList.size ? maxColorCount : -1;

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