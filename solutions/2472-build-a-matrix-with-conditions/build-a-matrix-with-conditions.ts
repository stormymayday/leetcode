function buildMatrix(k: number, rowConditions: number[][], colConditions: number[][]): number[][] {
    
    // 1. Adjacency Lists
    const rowAdjList = buildAdjList(k, rowConditions);
    const colAdjList = buildAdjList(k, colConditions);

    // 2. Topological Ordering
    const rowOrder = kahns(rowAdjList);
    const colOrder = kahns(colAdjList);

    // 3. Cycle checks
    if(rowOrder.length === 0 || colOrder.length === 0) {
        return [];
    }

    // 4. hash maps for faster lookup
    const valToRow = new Map<number, number>(); // value -> row index
    const valToCol = new Map<number, number>(); // value -> col index
    for(let rowIdx = 0; rowIdx < rowOrder.length; rowIdx += 1) {
        const value = rowOrder[rowIdx];
        valToRow.set(value, rowIdx);
    }
    for(let colIdx = 0; colIdx < colOrder.length; colIdx += 1) {
        const value = colOrder[colIdx];
        valToCol.set(value, colIdx);
    }

    // 5. Creating the 'result' matrix
    const res: number[][] = new Array(k);
    // 5.1 Pre-filling the matrix with zeroes
    for(let i = 0; i < k; i += 1) {
        res[i] = new Array(k).fill(0);
    }
    // 5.2 Placing integers from 1 to k into their designated cells
    for(let value = 1; value <= k; value += 1) {
        const row = valToRow.get(value);
        const col = valToCol.get(value);
        res[row][col] = value;
    }
    return res;

};

function kahns(adjList: Map<number, Set<number>>): number[] {
    // 1. build inDegree map
    const inDegree = new Map<number, number>();
    for(const node of adjList.keys()) {
        inDegree.set(node, 0);
    }
    for(const node of adjList.keys()) {
        for(const neighbor of adjList.get(node)) {
            inDegree.set(neighbor, inDegree.get(neighbor) + 1);
        }
    }

    // 2. The 'ready' queue/stack for nodes with in-degree of zero
    const ready: number[] = [];
    for(const [node, inDegreeCount] of inDegree.entries()) {
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
            inDegree.set(neighbor, inDegree.get(neighbor) - 1);
            if(inDegree.get(neighbor) === 0) {
                ready.push(neighbor);
            }
        }
    }

    // 4. Cycle check & return
    if(topOrder.length === adjList.size) {
        return topOrder;
    } else {
        return []; // there was a cycle
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