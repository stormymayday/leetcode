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

        // coming from right
        if (from === 'right') {
            // going left - increase path length by 1 (forms a zig-zag)
            dfs(node.left, 'left', pathLength + 1);
            // going right - reset path length to 1 (not a zig-zag)
            dfs(node.right, 'right', 1);
        } 
        // coming from left
        else if (from === 'left') {
            // going left - reset path length to 1 (not a zig-zag)
            dfs(node.left, 'left', 1);
            // going right - increase path length by 1 (forms a zig-zag)
            dfs(node.right, 'right', pathLength + 1);
        } 
        // from 'root'
        else {
            // reset (set) path to 1 in both directions
            dfs(node.left, 'left', 1);
            dfs(node.right, 'right', 1);
        }

    }

    dfs(root, 'root', 0);

    return maxPathLength;

};