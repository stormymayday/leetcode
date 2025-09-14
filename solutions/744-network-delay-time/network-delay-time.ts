function networkDelayTime(times: number[][], n: number, k: number): number {

    const adjList = buildAdjList(n, times);

    const minPQ: [number, number][] = [];
    minPQ.push([k, 0]);

    const distances = new Map<number, number>();
    let maxDistance = 0
    while (minPQ.length > 0) {

        minPQ.sort((a, b) => a[1] - b[1]);

        const [currNode, currDist] = minPQ.shift();

        if (distances.has(currNode)) {
            continue;
        }

        distances.set(currNode, currDist);
        maxDistance = currDist;

        for (const [neighbor, neighborDist] of adjList.get(currNode)) {
            if (!distances.has(neighbor)) {
                minPQ.push([neighbor, currDist + neighborDist]);
            }

        }
    }

    if (distances.size !== n) {
        return -1; // didn't visit all the nodes
    } else {
        return maxDistance;
    }

};

function buildAdjList(n: number, edges: number[][]): Map<number, [number, number][]> {
    const adjList = new Map();
    for (let i = 1; i <= n; i += 1) {
        adjList.set(i, []);
    }
    for (const [src, dst, weight] of edges) {
        adjList.get(src).push([dst, weight]);
    }
    return adjList;
}