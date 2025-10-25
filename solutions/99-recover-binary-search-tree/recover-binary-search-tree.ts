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

/**
 Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): void {

    if(root === null) {
        return;
    }

    let node1: TreeNode | null = null;
    let node2: TreeNode | null = null;
    let prev: TreeNode | null = null;
    let curr: TreeNode | null = root;
    const stack: TreeNode[] = [];
    while(curr !== null || stack.length > 0) {
        while(curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop()!;

        if(prev !== null) {
            // Discrepancy found!
            if(prev.val > curr.val) {
                // First time: set both node1 and node2
                if(node1 === null) {
                    node1 = prev;
                    node2 = curr;
                } 
                // Second time: update node2
                else {
                    node2 = curr;
                    break;
                }
            }
        }

        prev = curr;
        curr = curr.right;
    }

    // Optional Guard
    if(node1 !== null && node2 !== null) {
        const temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }
    
};