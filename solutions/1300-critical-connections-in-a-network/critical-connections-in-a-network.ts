function criticalConnections(n: number, connections: number[][]): number[][] {
    // Initialze a standard adjacency list
    const adjList = buildAdjList(n, connections);

    // Initialze connections as a hash set for O(1) access and edge removal
    // Once every that that is part of the cycle is removed during the DFS
    // This will contain the result
    const connectionsSet = new Set<string>();
    for(const [src, dst] of connections) {
        connectionsSet.add(`${src},${dst}`);
    }

    // Initialze the 'rankMap' object
    // This acts as the loop detector
    // root (node that starts the DFS) assigned discoveryRank 0
    // Unvinisted nodes are initally undefined, and then assigned discoveryRank + 1 (distance from the root?)
    const rankMap: Record<number, number> = {};

    dfs(0, 0, adjList, rankMap, connectionsSet);


    const res: [number, number][] = [];
    for(const edge of connectionsSet) {
        const [src, dst] = edge.split(",");
        res.push([Number(src), Number(dst)]);
    }
    return res;

};

function dfs(node: number, discoveryRank: number, adjList: Map<number, Set<number>>, rankMap: Record<number, number>, connectionsSet: Set<string>): number {

    // That means this node is already visited. We simply return the rank.
    if(rankMap[node] !== undefined) {
        return rankMap[node];
    }

    // Otherwise, update the rank of this node.
    rankMap[node] = discoveryRank;

    //  This is the max we have seen till now. So we start with this instead of Infinity.
    let minRank = discoveryRank + 1; // dont really get it
    for(const neighbor of adjList.get(node)) {

        // Skip the parent
        if(rankMap[neighbor] !== undefined && rankMap[neighbor] === discoveryRank - 1) {
            continue; // can we just use 'rank[neighbor] !== undefined' ?
        }

        // Recurse on the neighbor 
        const recursiveRank = dfs(neighbor, discoveryRank + 1, adjList, rankMap, connectionsSet);

        // Step 1, check if this edge needs to be discarded
        if(recursiveRank <= discoveryRank) {
            connectionsSet.delete(`${node},${neighbor}`);
            connectionsSet.delete(`${neighbor},${node}`);

        }

        // Step 2, update the minRank if needed (why?)
        minRank = Math.min(minRank, recursiveRank);

    }

    return minRank;

}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map();
    for(let i = 0; i < n; i += 1) {
        adjList.set(i, new Set());
    }
    for(const [src, dst] of edges) {
        adjList.get(src).add(dst);
        adjList.get(dst).add(src);
    }
    return adjList;
}