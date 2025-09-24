function criticalConnections(n: number, connections: number[][]): number[][] {
    // Initialize adjacency list
    const adjList = buildAdjList(n, connections);
    
    // Initialize connections as a set for O(1) access and removal
    // Store edges in a normalized format (smaller node first)
    const connectionsSet = new Set<string>();
    for(const [src, dst] of connections) {
        const edge = src < dst ? `${src},${dst}` : `${dst},${src}`;
        connectionsSet.add(edge);
    }
    
    // Initialize rank map for cycle detection
    const rankMap: Record<number, number> = {};
    
    // Start DFS from node 0 with no parent (-1)
    dfs(0, 0, -1, adjList, rankMap, connectionsSet);
    
    // Convert remaining edges back to array format
    const result: number[][] = [];
    for(const edge of connectionsSet) {
        const [src, dst] = edge.split(",").map(Number);
        result.push([src, dst]);
    }
    return result;
}

function dfs(
    node: number, 
    discoveryRank: number, 
    parent: number,
    adjList: Map<number, Set<number>>, 
    rankMap: Record<number, number>, 
    connectionsSet: Set<string>
): number {
    // If already visited, return its rank
    if(rankMap[node] !== undefined) {
        return rankMap[node];
    }
    
    // Assign rank to current node
    rankMap[node] = discoveryRank;
    
    // Track minimum rank reachable from this subtree
    let minRank = discoveryRank;
    
    for(const neighbor of adjList.get(node)!) {
        // Skip parent to avoid going back
        if(neighbor === parent) {
            continue;
        }
        
        const recursiveRank = dfs(neighbor, discoveryRank + 1, node, adjList, rankMap, connectionsSet);
        
        // If we can reach a node with rank <= current rank through this neighbor,
        // then this edge is part of a cycle and is NOT a bridge
        if(recursiveRank <= discoveryRank) {
            const edge = node < neighbor ? `${node},${neighbor}` : `${neighbor},${node}`;
            connectionsSet.delete(edge);
        }
        
        // Update minimum reachable rank
        minRank = Math.min(minRank, recursiveRank);
    }
    
    return minRank;
}

function buildAdjList(n: number, edges: number[][]): Map<number, Set<number>> {
    const adjList = new Map<number, Set<number>>();
    
    // Initialize empty sets for all nodes
    for(let i = 0; i < n; i++) {
        adjList.set(i, new Set<number>());
    }
    
    // Add edges in both directions (undirected graph)
    for(const [src, dst] of edges) {
        adjList.get(src)!.add(dst);
        adjList.get(dst)!.add(src);
    }
    
    return adjList;
}