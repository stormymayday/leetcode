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

    if (root === null) {
        return -Infinity;
    }

    // In-Order Traversal
    // - Option 1: recursive DFS
    // - Option 2: iterative DFS with stack and pointer
    // - Option 3: Morris Traversal

    let count = 0;
    let res: TreeNode | null = null;

    let curr: TreeNode | null = root;
    const stack: TreeNode[] = [];
    while(curr !== null || stack.length > 0) {

        while(curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();

        count += 1;
        if(count === k) {
            res = curr;
            break;
        }

        curr = curr.right;

    }

    // Optional Guard - if there are less than k nodes in the tree
    if(res === null) {
        return -Infinity;
    } else {
        return res.val;
    }

};