function validateBinaryTreeNodes(n: number, leftChild: number[], rightChild: number[]): boolean {

    const children = new Set([...leftChild, ...rightChild]);
    children.delete(-1);

    if (children.size === n) {
        return false; // should be n-1
    }

    // Find root
    let root: number = 0;
    for (let i = 0; i < n; i += 1) {
        if (!children.has(i)) {
            root = i;
        }
    }

    const visited = new Set<number>();
    let queue: number[] = [root];

    while (queue.length > 0) {

        const nextQueue: number[] = [];

        for (let i = 0; i < queue.length; i += 1) {

            const currNode = queue[i];

            if (visited.has(currNode)) {
                return false;
            }
            visited.add(currNode);

            if (leftChild[currNode] !== -1) {
                nextQueue.push(leftChild[currNode]);
            }

            if (rightChild[currNode] !== -1) {
                nextQueue.push(rightChild[currNode]);
            }

        }

        queue = nextQueue;

    }

    return visited.size === n;

};