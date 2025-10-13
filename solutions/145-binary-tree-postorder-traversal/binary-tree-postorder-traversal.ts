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

    function helperDFS(root: TreeNode | null): void {
        if(root === null) {
            return;
        }
        helperDFS(root.left);
        helperDFS(root.right);
        res.push(root.val);
    }

    helperDFS(root);

    return res;
    
};