function shortestAlternatingPaths(n: number, redEdges: number[][], blueEdges: number[][]): number[] {

    const adjList = buildAdjList(n, redEdges, blueEdges);

    return bfs(0, adjList);

};

function bfs(src: number, adjList: Map<number, [number, string][]>): number[] {

    let queue: [number, number, string][] = []; // [node, distance, edgeColor)]
    queue.push([src, 0, "hwite"]);

    const visited = new Set<string>();
    visited.add('0,hwhite');

    const result: number[] = new Array(adjList.size).fill(-1);

    while (queue.length > 0) {

        const nextQueue: [number, number, string][] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const [currNode, currDist, currColor] = queue[i];

            if (result[currNode] === -1) {
                result[currNode] = currDist;
            }

            for (const [neighbor, color] of adjList.get(currNode)) {

                if (currColor !== color) {
                    if (!visited.has(`${neighbor},${color}`)) {
                        visited.add(`${neighbor},${color}`);
                        nextQueue.push([neighbor, currDist + 1, color]);
                    }
                }

            }

        }

        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }
    }

    return result;

}

function buildAdjList(n: number, redEdges: number[][], blueEdges: number[][]): Map<number, [number, string][]> {
    const adjList = new Map();
    for (let i = 0; i < n; i += 1) {
        adjList.set(i, []);
    }
    // Red Edges
    for (const [src, dst] of redEdges) {
        adjList.get(src).push([dst, "red"])
    }
    // Blue Edges
    for (const [src, dst] of blueEdges) {
        adjList.get(src).push([dst, "blue"]);
    }
    return adjList;
}