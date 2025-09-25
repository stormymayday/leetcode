function canReach(arr: number[], start: number): boolean {

    // starting node: starting 'index', target: value '0' at any index
    return dfs(start, 0, arr, new Set());

};

function dfs(src: number, targetVal: number, arr: number[], visited: Set<number>): boolean {

    // Base Case: src (index) out of bounds
    if(src < 0 || src >= arr.length) {
        return false;
    }

    // Base Case: targetVal found
    if(arr[src] === targetVal) {
        return true;
    }

    // Base Case: src (index) has been visited
    if(visited.has(src)) {
        return false;
    }

    visited.add(src);

    // Try jumping backwards and forward
    return dfs(src - arr[src], targetVal, arr, visited) || 
           dfs(src + arr[src], targetVal, arr, visited);
}