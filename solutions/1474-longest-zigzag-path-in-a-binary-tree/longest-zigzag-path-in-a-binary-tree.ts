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

function longestZigZag(root: TreeNode | null): number {

    let maxPathLength: number = 0;

    function dfs(node: TreeNode | null, from: string, pathLength: number): void {
        if (node === null) {
            return;
        }

        maxPathLength = Math.max(maxPathLength, pathLength);

        if (from === 'right') {
            dfs(node.left, 'left', pathLength + 1);
            dfs(node.right, 'right', 1);
        } else if (from === 'left') {
            dfs(node.left, 'left', 1);
            dfs(node.right, 'right', pathLength + 1);
        } else {
            dfs(node.left, 'left', 1);
            dfs(node.right, 'right', 1);
        }

    }

    dfs(root, 'root', 0);

    return maxPathLength;

};