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
    const stack: number[] = [root];

    while(stack.length > 0) {

        const currNode = stack.pop();

        if(visited.has(currNode)) {
            return false;
        }
        visited.add(currNode);

        if(leftChild[currNode] !== -1) {
            stack.push(leftChild[currNode]);
        }

        if(rightChild[currNode] !== -1) {
            stack.push(rightChild[currNode]);
        }

    }

    return visited.size === n;
    
};