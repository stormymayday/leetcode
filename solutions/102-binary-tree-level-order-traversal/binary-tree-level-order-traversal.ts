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

function levelOrder(root: TreeNode | null): number[][] {
    const levels: number[][] = [];
    function dfs(root: TreeNode | null, level: number): void {

        if(root === null) {
            return;
        }

        if(levels[level] === undefined) {
            levels[level] = [];
        }
        levels[level].push(root.val);

        dfs(root.left, level + 1);
        dfs(root.right, level + 1);

    }
    dfs(root, 0);
    return levels;
};