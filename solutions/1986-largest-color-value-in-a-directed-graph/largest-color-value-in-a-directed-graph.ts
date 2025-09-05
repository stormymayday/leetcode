function largestPathValue(colors: string, edges: number[][]): number {

    // number of nodes in the graph
    const n = colors.length;

    const adjList = buildAdjList(n, edges);

    return kahns(adjList, colors);

};

function kahns(adjList: Map<number, Set<number>>, colors: string): number {

    // 1. Initialze the inDegree and maxColorCountsAtNode maps
    const inDegree = new Map<number, number>();
    const maxColorCountsAtNode = new Map<number, number[]>();
    // key: nodeId
    // value: array where index represents color and value represents max count of that color in any path ending at this node
    for (const node of adjList.keys()) {
        inDegree.set(node, 0);
        maxColorCountsAtNode.set(node, new Array(26).fill(0));
    }
    for (const node of adjList.keys()) {
        for (const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. Initialze the 'ready' queue/stack with nodes with inDegree count of zero
    // 2.1 Set color values for those nodes
    const ready: number[] = [];
    for (const [node, inDegreeCount] of inDegree.entries()) {
        if (inDegreeCount === 0) {
            ready.push(node);

            // getting the color index for that node
            const colorIdx = colors.charCodeAt(node) - "a".charCodeAt(0);
            // initialize count for that color to 1 (source nodes start with 1 of their own color)
            maxColorCountsAtNode.get(node)[colorIdx] = 1;
        }
    }

    // 3. Peform Kahn's BFS
    const topOrder: number[] = [];
    let largestColorValue: number = 0;
    while(ready.length > 0) {

        const currNode = ready.pop();
        topOrder.push(currNode);

        // Update Largest Color Value (max between 'largestColorValue' and currNode's 'maxColorCountsAtNode')
        for(let colorIdx = 0; colorIdx < 26; colorIdx += 1) {
            largestColorValue = Math.max(largestColorValue, maxColorCountsAtNode.get(currNode)[colorIdx]);
        }

        for(const neighbor of adjList.get(currNode)) {

            // Propogate currNode's color counts to it's neighbors IF it is greater (take max)
            for(let colorIdx = 0; colorIdx < 26; colorIdx += 1) {
                const max = Math.max(maxColorCountsAtNode.get(currNode)[colorIdx], maxColorCountsAtNode.get(neighbor)[colorIdx]);
                maxColorCountsAtNode.get(neighbor)[colorIdx] = max;
            }

            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                ready.push(neighbor);
                // Increment node's own color count by 1
                const colorIdx = colors.charCodeAt(neighbor) - 'a'.charCodeAt(0);
                maxColorCountsAtNode.get(neighbor)[colorIdx] += 1;
            }

        }

    }


    // 4. Cycle check and return
    if(topOrder.length === adjList.size) {
        return largestColorValue;
    } else {
        return -1; // there was a cycle
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