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
    const result = [];
    return dfs(root, 0, result);
};

function dfs(root: TreeNode | null, depth: number, arr: number[][]): number[][] {
    if(root === null) {
        return arr;
    }

    if(arr[depth] === undefined) {
        arr[depth] = [];
    }
    arr[depth].push(root.val);
    dfs(root.left, depth + 1, arr);
    dfs(root.right, depth + 1, arr);
    return arr;
}