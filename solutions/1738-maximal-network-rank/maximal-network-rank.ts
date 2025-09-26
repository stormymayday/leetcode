function maximalNetworkRank(n: number, roads: number[][]): number {
    
    const adjList = buildAdjList(n, roads);

    const adjListArray = Array.from(adjList);

    let maxRank = 0;
    for(let i = 0; i < adjListArray.length - 1; i += 1) {
        for(let j = i + 1; j < adjListArray.length; j += 1) {
            const [node1, neighbours1] = adjListArray[i];
            const [node2, neighbours2] = adjListArray[j];
            let currRank = neighbours1.size + neighbours2.size;
            if(neighbours1.has(node2)) {
                currRank -= 1;
            }
            maxRank = Math.max(maxRank, currRank);
        }
    }

    return maxRank;
};

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