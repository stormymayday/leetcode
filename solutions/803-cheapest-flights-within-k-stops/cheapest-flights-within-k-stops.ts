function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {

    // 1. Create a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // key: src -> val: [[dst, cost], ...]
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for (const [src, dst, cost] of flights) {
        adjList.get(src).push([dst, cost]);
    }

    // 2. Initialze a (naive) priority queue
    const minPQ: [number, number, number][] = []; // [cost, edgesUsed, node]
    minPQ.push([0, 0, src]);

    // 3. visited hash map
    const visited = new Map<number, number>(); // key: node -> val: edgesUsed

    // 4. Perform Dijkstra
    while(minPQ.length > 0) {

        minPQ.sort((a, b) => a[0] - b[0]);

        const [currCost, currEdgesUsed, currNode] = minPQ.shift();

        if(currNode === dst) {
            return currCost;
        }

        if(visited.has(currNode) && 
        visited.get(currNode) <= currEdgesUsed ||
        currEdgesUsed >= k + 1
        ) {
            continue;
        }

        visited.set(currNode, currEdgesUsed);

        for(const [neighbor, neighborCost] of adjList.get(currNode)) {
            minPQ.push([currCost + neighborCost, currEdgesUsed + 1, neighbor]);
        }

    }

    return -1;

};