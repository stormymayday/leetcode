function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {

    const children = new Set([...leftChild, ...rightChild]);
    children.delete(-1);

    if(children.size === n) {
        return false; // should be n-1
    }

    // Find root
    let root: number = 0;
    for(let i = 0; i < n; i += 1) {
        if(!children.has(i)) {
            root = i;
        }
    }

    const visited = new Set<number>();
    function dfs(node: number): boolean {

        if(node === -1) {
            return true;
        }

        if(visited.has(node)) {
            return false;
        }

        visited.add(node);

        const leftSubtree = dfs(leftChild[node]);
        if(leftSubtree === false) {
            return false;
        }

        const rightSubtree = dfs(rightChild[node]);
        if(rightSubtree === false) {
            return false;
        }

        return true;

    }

    return dfs(root) && visited.size === n;
    
};