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

function amountOfTime(root: TreeNode | null, start: number): number {
    
    // 1. Perform a DFS traversal to build a Graph (Adjacency List)
    const graph = new Map<number, Set<number>>();
    binaryTreeDFS(root, graph);

    // 2. Perform BFS on the Graph (Adjacency List)
    const res: number = adjListBFS(start, graph);
    return res;

};

function binaryTreeDFS(root: TreeNode | null, adjList: Map<number, Set<number>>): void {

    // Base Case
    if(root === null) {
        return;
    }

    if(!adjList.has(root.val)) {
        adjList.set(root.val, new Set());
    }

    if(root.left) {

        adjList.get(root.val).add(root.left.val);
        if(!adjList.has(root.left.val)) {
            adjList.set(root.left.val, new Set());
        }
        adjList.get(root.left.val).add(root.val);

        binaryTreeDFS(root.left, adjList);
    }

    if(root.right) {

        adjList.get(root.val).add(root.right.val);
        if(!adjList.has(root.right.val)) {
            adjList.set(root.right.val, new Set());
        }
        adjList.get(root.right.val).add(root.val);

        binaryTreeDFS(root.right, adjList);
    }

}

function adjListBFS(src: number, adjList: Map<number, Set<number>>): number {

    let queue: number[] = [];
    queue.push(src);
    const visited = new Set<number>();
    visited.add(src);

    let layers = 0; // not counting one in the queue

    while(queue.length > 0) {

        const queueLength = queue.length;
        const nextLayer: number[] = [];
        
        // Processing all nodes at this level
        for(let i = 0; i < queueLength; i += 1) {
            const currNode = queue.shift();
            
            for(const neighbor of adjList.get(currNode)) {
                if(!visited.has(neighbor)) {
                    visited.add(neighbor);
                    nextLayer.push(neighbor);
                }
            }
        }

        if(nextLayer.length > 0) {
            queue = nextLayer;
            layers += 1;
        }

    }

    return layers;
 
}