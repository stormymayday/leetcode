function largestPathValue(colors: string, edges: number[][]): number {
    // colors.length is the number of nodes in the graph
    const adjList = buildAdjList(colors.length, edges);

    // Key: number (represents a node ID)
    // Value: number[] (an array of 26 numbers)
    const colorCount = new Map<number, number[]>();
    for (const nodeId of adjList.keys()) {
        colorCount.set(nodeId, new Array<number>(26).fill(0));
    }


    return kahns(adjList, colorCount, colors);
};

function kahns(adjList: Map<number, Set<number>>, colorCount: Map<number, number[]>, colors: string): number {

    // 1. Build and inDegree map
    const inDegree = new Map<number, number>();
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialzie the 'ready' queue/stack for nodes with an indegree of zero
    const stack: number[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            stack.push(node);
        }
    }

    // 3. Kahn's BFS
    const topOrder: number[] = [];
    let maxColorCount = 0;
    while (stack.length > 0) {

        const currNode = stack.pop();
        topOrder.push(currNode);

        const colorIndex = colors.charCodeAt(currNode) - 'a'.charCodeAt(0);
        // increment count current nodes color
        colorCount.get(currNode)[colorIndex] += 1;
        // update max
        maxColorCount = Math.max(maxColorCount, colorCount.get(currNode)[colorIndex]);

        for (const neighbor of adjList.get(currNode)) {

            // Propagate the maximum color counts to neighbors
            for (let color = 0; color < 26; color += 1) {
                colorCount.get(neighbor)[color] = Math.max(colorCount.get(neighbor)[color], colorCount.get(currNode)[color]);
            }

            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if (inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }

        }

    }

    // 4. Cycle check and return
    if (topOrder.length === adjList.size) {
        return maxColorCount;
    } else {
        return -1; // graph contains a cycle
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