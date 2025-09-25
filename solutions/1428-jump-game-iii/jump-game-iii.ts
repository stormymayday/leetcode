function canReach(arr: number[], start: number): boolean {

    // starting node: starting 'index', target: value '0' at any index
    return dfs(start, 0, arr);

};

function dfs(src: number, targetVal: number, arr: number[]): boolean {

    // Base Case: src (index) out of bounds
    if(src < 0 || src >= arr.length) {
        return false;
    }

    // Base Case: targetVal found
    if(arr[src] === targetVal) {
        return true;
    }

    // Base Case: negative value (visited)
    if(arr[src] < 0) {
        return false;
    }

    // Since value at current index is not the target
    // We can multiply it by -1, essentially marking it as 'visited'
    // Eliminates need for the 'visited' set
    const originalValue = arr[src]; // MUST PRESERVE ORIGINAL VALUE FOR JUMP CALCULATION
    arr[src] = arr[src] * (-1);

    // Try jumping backwards and forward
    return dfs(src - originalValue, targetVal, arr) || 
           dfs(src + originalValue, targetVal, arr);
}