function canReach(arr: number[], start: number): boolean {

    const adjList = buildAdjList(arr);

    // starting node: starting 'index', target: value '0' at any index
    return dfs(start, 0, adjList, arr, new Set());

};

function dfs(src: number, targetVal: number, adjList: Map<number, Set<number>>, arr: number[], visited: Set<number>): boolean {

    // Base Case: src (index) out of bounds
    // if(src < 0 || src >= arr.length) {
    //     return false;
    // }

    // Base Case: targetVal found
    if(arr[src] === targetVal) {
        return true;
    }

    // Base Case: src (index) has been visited
    if(visited.has(src)) {
        return false;
    }

    visited.add(src);

    for(const neighbor of adjList.get(src)) {
        if(dfs(neighbor, targetVal, adjList, arr, visited) === true) {
            return true; // exit early if target found
        }
    }

    // target not found
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