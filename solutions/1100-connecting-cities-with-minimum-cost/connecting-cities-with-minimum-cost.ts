function minimumCost(n: number, connections: number[][]): number {

    // 1. Create a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // key: src -> val: [[dst, cost], ...]
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst, cost] of connections) {
        adjList.get(src).push([dst, cost]);
        adjList.get(dst).push([src, cost]);
    }

    // 2. Choose a node, mark it as visited, queue up it's neighbors
    const visited = new Set<number>();
    visited.add(1);
    const minPQ: [number, number, number][] = []; // [cost, src, dst]
    for(const [neighbor, cost] of adjList.get(1)) {
        minPQ.push([cost, 1, neighbor]);
    }

    // 3. Perform Prim's
    let mstCost = 0;
    let edgesUsed = 0;
    while(minPQ.length > 0) {

        minPQ.sort((a, b) => {
            return a[0] - b[0];
        });

        const [cost, src, currNode] = minPQ.shift();
        
        if(visited.has(currNode)) {
            continue;
        }
        
        visited.add(currNode);
        mstCost += cost;
        edgesUsed += 1;
        if(edgesUsed === n - 1) {
            return mstCost;
        }

        for(const [neighbor, cost] of adjList.get(currNode)) {
            if(!visited.has(neighbor)) {
                minPQ.push([cost, currNode, neighbor]);
            }
        }
     
    }
    // Edge Case: mpossible to connect all the cities
    return -1;
};