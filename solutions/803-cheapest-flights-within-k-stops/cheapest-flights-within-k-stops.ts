function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
    // 1. Create a weighted adjacency list
    const adjList = new Map<number, [number, number][]>(); // src -> [[dst, cost], ...]
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    for(const [a, b, cost] of flights) {
        adjList.get(a).push([b, cost]);
    }

    // 2. Create costs array of size and and fill with Infinities
    const costs: number[] = new Array(n).fill(Infinity);

    // 3. Set up a queue and enqueue source node with cost of 0
    const queue: [number, number][] = [[src, 0]];

    // 4. Create stops variable and set to 0
    let stops = 0;

    // 5. Run BFS until queue is not empty AND stops <= k
    while(queue.length > 0 && stops <= k) {

        // 5.1. snapshot of the current queue size
        const size = queue.length;

        // 5.2. process all nodes on the current level
        for(let i = 0; i < size; i += 1) {

            const [currNode, currCost] = queue.shift();
            
            // 5.3 Iterate over all neighbors of current node
            for(const [neighborNode, neighborCost] of adjList.get(currNode)) {
                
                // 5.4. Calculate new cost
                const newCost = currCost + neighborCost;

                // 5.5. If we found a cheaper path to neighbor, update and add to queue
                if(newCost < costs[neighborNode]) {
                    costs[neighborNode] = newCost;
                    queue.push([neighborNode, newCost]);
                }

            }

        }

        // After processing all nodes at current level, increment stops
        stops++;

    }

    return costs[dst] === Infinity ? -1 : costs[dst];
};