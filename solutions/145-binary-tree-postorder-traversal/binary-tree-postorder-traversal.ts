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

function postorderTraversal(root: TreeNode | null): number[] {
    
    const res: number[] = [];
    const stack: TreeNode[] = [];
    let curr: TreeNode | null = root;

    while(curr !== null || stack.length > 0) {

        if(curr !== null) {

            // Process current node
            res.push(curr.val);

            // Push 'curr' to the stack
            stack.push(curr);

            // Move right
            curr = curr.right

        } else {

            curr = stack.pop();
            curr = curr.left;

        }

    }

    return res.reverse();

};