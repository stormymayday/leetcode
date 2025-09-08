function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
    
    // 1. Build adjacecny lists
    const adjListRows = buildAdjList(k, rowConditions);
    const adjListCols = buildAdjList(k, colConditions);

    // 2. Try Topological Ordering
    const rowTopOrder = kahns(adjListRows);
    const colTopOrder = kahns(adjListCols);

    // 3. Check for cycles
    if(rowTopOrder.length === 0 || colTopOrder.length === 0) {
        return []; // early exit due to cycles
    }

    // 4. hash maps for faster lookup
    const valToRow = new Map<number, number>();
    const valToCol = new Map<number, number>();
    for(let index = 0; index < k; index += 1) {
        // assign values to row / col (indicies) according their topological ordering
        const rowOrderVal = rowTopOrder[index];
        const colOrderVal = colTopOrder[index];
        valToRow.set(rowOrderVal, index);
        valToCol.set(colOrderVal, index);
    }

    // 5. Building the result matrix
    const res: number[][] = new Array(k);
    for(let i = 0; i < k; i += 1) {
        res[i] = new Array(k).fill(0); // pre-fill with zeroes
    }
    for(let val = 1; val <= k; val += 1) {
        const row = valToRow.get(val); // get the row (index)
        const col = valToCol.get(val); // get the col (index)
        res[row][col] = val; 
    }
    return res;
    
};

function kahns(adjList: Map<number, Set<number>>): number[] {

    // 1. in-degree map
    const inDegreeMap = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegreeMap.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) + 1);
        }
    }

    // 2. 'ready' queue / stack
    const ready: number[] = [];
    for(const [node, inDegreeCount] of inDegreeMap.entries()) {
        if(inDegreeCount === 0) {
            ready.push(node);
        }
    }

    // 3. Kahn's BFS
    const topOrder: number[] = [];
    while(ready.length > 0) {
        const currNode = ready.pop();
        topOrder.push(currNode);
        for(const neighbor of adjList.get(currNode)) {
            inDegreeMap.set(neighbor, inDegreeMap.get(neighbor) - 1);
            if(inDegreeMap.get(neighbor) === 0) {
                ready.push(neighbor);
            }
        }
    }

    // 4. Cycle check & return
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return []; // cycle
    }

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
    }
    return adjList;
}