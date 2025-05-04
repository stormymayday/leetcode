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

    // Edge Case: empty root
    if(!root) {
        return [];
    }

    const result = [];
    const stack = [root];

    while(stack.length > 0) {

        const current = stack.pop();

        result.push(current.val);

        if(current.left) {
            stack.push(current.left);
        }

        if(current.right) {
            stack.push(current.right);
        }
        
    }

    return result.reverse();
    
};