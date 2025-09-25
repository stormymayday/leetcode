function canReach(arr: number[], start: number): boolean {

    const adjList = buildAdjList(arr);

    // starting node: starting 'index', target: value '0' at any index
    return bfs(start, 0, adjList, arr);

};

function bfs(src: number, targetVal: number, adjList: Map<number, Set<number>>, arr: number[]): boolean {

    const n = arr.length;

    let queue: number[] = [];
    queue.push(src);

    const visited = new Set<number>();
    visited.add(src);

    while (queue.length > 0) {

        const nextQueue: number[] = [];
        for (let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            if (arr[currNode] === targetVal) {
                return true;
            }

            for(const neighbor of adjList.get(currNode)) {
                if(!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextQueue.push(neighbor);
                }
            }

        }
        if (nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return false;

}

function buildAdjList(arr: number[]): Map<number, Set<number>> {
    const adjList = new Map();
    for (let idx = 0; idx < arr.length; idx += 1) {
        adjList.set(idx, new Set());
    }
    for (let idx = 0; idx < arr.length; idx += 1) {
        // Trying to create an edge going backwards
        const backIdx = idx - arr[idx];
        if (backIdx >= 0) {
            adjList.get(idx).add(backIdx);
        }

        // Trying to create an edge going forward
        const forwardIdx = idx + arr[idx];
        if (forwardIdx < arr.length) {
            adjList.get(idx).add(forwardIdx);
        }
    }
    return adjList;
}