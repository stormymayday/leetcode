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

function preorderTraversal(root: TreeNode | null): number[] {
    const res: number[] = [];
    dfs(root, res);
    return res;
};


function dfs(root: TreeNode | null, res: number[]): void {
    if(root === null) {
        return;
    }

    res.push(root.val);

    dfs(root.left, res);
    dfs(root.right, res);
}
