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

    const colorCount = new Map<number, number[]>();
    for(const color of adjList.keys()) {
        colorCount.set(color, new Array<number>(26).fill(0));
    }
    let maxColor = 0;
    let visitedNodes = 0;

    while(stack.length > 0) {

        const current = stack.pop();
        visitedNodes += 1;

        const currentColorIndex = colors.charCodeAt(current) - 'a'.charCodeAt(0);
        colorCount.get(current)[currentColorIndex] += 1;
        maxColor = Math.max(maxColor, colorCount.get(current)[currentColorIndex]);

        for(const neighbor of adjList.get(current)) {

            for(let c = 0; c < 26; c += 1) {
                colorCount.get(neighbor)[c] = Math.max(colorCount.get(neighbor)[c], colorCount.get(current)[c])
            }

            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                stack.push(neighbor);
            }

        }
    }
    if(visitedNodes === colors.length) {
        return maxColor;
    } else {
        return -1; // cycle
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