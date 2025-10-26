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

function largestValues(root: TreeNode | null): number[] {

    const res: number[] = [];

    if(root === null) {
        return res;
    }

    function dfs(node: TreeNode | null, level: number): void {

        if(node === null) {
            return;
        }

        // if(res[level] === undefined) {
        //     res[level] = node.val;
        // } else {
        //     res[level] = Math.max(res[level], node.val);
        // }

        if(res.length === level) {
            res.push(node.val)
        } else {
            res[level] = Math.max(res[level], node.val);
        }

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);

    };
    dfs(root, 0);

    return res;
    
};