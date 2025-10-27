function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {
    
    // Children Hash Set, will help finding the root
    const children = new Set<number>([...leftChild, ...rightChild]);
    children.delete(-1);

    if(children.size === n) {
        return false; // there is a cycle
    }

    // Number that is not in the 'children' hash set must be the root
    let root: number = -1;
    for(let i = 0; i < n; i += 1) {
        if(!children.has(i)) {
            root = i;
        }
    }

    // Optional Guard
    if(root === -1) {
        return false;
    }

    // visited hash set will help detect cycles and connectivity
    const visited = new Set<number>();
    function dfs(node: number): boolean {

        // Base Case: reached 'null', so far it's a valid tree
        if(node === -1) {
            return true;
        }

        if(visited.has(node)) {
            return false; // cycle
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