/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

function distanceK(root: TreeNode | null, target: TreeNode | null, k: number): number[] {

    // 1. DFS the binary tree to build a bi-drectional graph (adjacency list)
    const adjList = new Map<number, Set<number>>();
    dfs(root, adjList);

    // 2. BFS the graph to get the result
    return bfs(target.val, adjList, k);

};

// Graph BFS
function bfs(src: number, adjList: Map<number, Set<number>>, k: number): number[] {

    let queue: number[] = [];
    queue.push(src);

    const visited = new Set<number>();
    visited.add(src);

    let level = 0; // stop when reaches 'k'

    while(queue.length > 0) {

        const nextQueue: number[] = [];

        // processing current level
        for(let i = 0; i < queue.length; i += 1) {

            if(level === k) {
                return queue;
            }

            let currNode = queue[i];

            for(const neighbor of adjList.get(currNode)) {
                if(!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextQueue.push(neighbor);
                }
            }

        }
        // done processing current level
        level += 1;
        if(level === k) {
            return nextQueue;
        } else if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    // Edge Case: there are no nodes 'k' distance from the 'src'
    return [];

}

// Pre-Order DFS on a binary tree
function dfs(root: TreeNode | null, adjList: Map<number, Set<number>>): void {
    // Base Case
    if(root === null) {
        return;
    }

    // Visit: Create an entry in the adjacency list for the root value
    if (!adjList.has(root.val)) {
        adjList.set(root.val, new Set());
    }

    // Check if there is a left child
    if (root.left !== null) {
        // Create an entry in the adjacency list for the left child value
        if (!adjList.has(root.left.val)) {
            adjList.set(root.left.val, new Set());
        }
        // Create a bi-directional connection
        adjList.get(root.val).add(root.left.val);
        adjList.get(root.left.val).add(root.val);
        // Recurse Left
        dfs(root.left, adjList);
    }

    // Recurse Right
    if (root.right !== null) {
        // Create an entry in the adjacency list for the right child value
        if (!adjList.has(root.right.val)) {
            adjList.set(root.right.val, new Set());
        }
        // Create a bi-directional connection
        adjList.get(root.val).add(root.right.val);
        adjList.get(root.right.val).add(root.val);
        // Recurse Right
        dfs(root.right, adjList);
    }
}