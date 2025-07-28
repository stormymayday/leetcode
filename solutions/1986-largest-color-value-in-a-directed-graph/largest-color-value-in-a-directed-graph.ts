function largestPathValue(colors: string, edges: number[][]): number {
    const adjList = buildAdjList(colors.length, edges);
    return kahns(adjList, colors);
};


function kahns(adjList: Map<number, Set<number>>, colors: string): number {
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }
    const stack: number[] = [];
    for(const [node, count] of inDegree.entries()) {
        if(count === 0) {
            stack.push(node);
        }
    }
    let visited = 0;
    let maxColorCount = 0;
    const colorCountMap = new Map<number, number[]>();
    for(let i = 0; i < colors.length; i += 1) {
        // i is a node
        colorCountMap.set(i, new Array<number>(26).fill(0));

        // setting color for this node
        // const colorIndex = colors.charCodeAt(i) - 'a'.charCodeAt(0);
        // colorCountMap.get(i)[colorIndex] = 1; 
    }
    while(stack.length > 0) {
        const current = stack.pop();
        visited += 1;
        const colorIndex = colors.charCodeAt(current) - 'a'.charCodeAt(0);
        // increment count current nodes color
        colorCountMap.get(current)[colorIndex] += 1;
        // update max
        maxColorCount = Math.max(maxColorCount, colorCountMap.get(current)[colorIndex]);
        for(const neighbor of adjList.get(current)) {

            // propagate color count to the neighbors
            for(let color = 0; color < 26; color += 1) {
                colorCountMap.get(neighbor)[color] = Math.max(colorCountMap.get(neighbor)[color], colorCountMap.get(current)[color]);
            }

            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }
        }
    }
    if(visited === adjList.size) {
        return maxColorCount;
    } else {
        return -1; // there was a cycle
    }
}

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