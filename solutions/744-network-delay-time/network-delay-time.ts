function networkDelayTime(times: number[][], n: number, k: number): number {

    // 1. Create a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // key: src -> val: [[dst, cost], ...]
    for(let i = 1; i <= n; i += 1) {
        adjList.set(i, []);
    }
    for(const [src, dst, cost] of times) {
        adjList.get(src).push([dst, cost]);
    }

    // 2. Queue-up source node with cost of 0
    const minPQ: [number, number][] = [] //  [cost, node]
    minPQ.push([0, k]);

    // 3. Perform Dijkstra's
    const distances = new Set<number>(); // key: node
    let maxDistance = 0;
    while(minPQ.length > 0) {

        // Immitation Priority Queue
        minPQ.sort((a, b) => a[0] - b[0]);

        const [currCost, currNode] = minPQ.shift();

        if(distances.has(currNode)) {
            continue;
        }
        distances.add(currNode);
        maxDistance = currCost;

        for(const [neighbor, neighborCost] of adjList.get(currNode)) {
            if(!distances.has(neighbor)) {
                minPQ.push([currCost + neighborCost, neighbor]);
            }
        }
    }
    return n === distances.size ? maxDistance : -1;

};