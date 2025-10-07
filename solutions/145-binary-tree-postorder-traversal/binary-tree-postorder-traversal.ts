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

    if(root === null) {
        return res;
    }

    const stack: TreeNode[] = [];
    stack.push(root);

    while(stack.length > 0) {

        const curr = stack.pop();

        res.push(curr.val);

        if(curr.left !== null) {
            stack.push(curr.left);
        }

        if(curr.right !== null) {
            stack.push(curr.right);
        }

    }

    return res.reverse();

};