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

function kthSmallest(root: TreeNode | null, k: number): number {

    if(root === null) {
        return Infinity;
    }

    let curr: TreeNode | null = root;
    const stack: TreeNode[] = []
    let nodesVisited: number = 0;

    while(curr !== null || stack.length > 0) {

        while(curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        nodesVisited += 1;
        if(nodesVisited === k) {
            break;
        }
        curr = curr.right;

    }

    return curr.val;

    
};