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
    if(root === null) {
        return [];
    }
    const levels = [];
    function helper(root, levels, levelNum) {
        if(root === null) {
            return;
        }

        if(levels[levelNum] === undefined) {
            levels[levelNum] = [];
        }
        levels[levelNum].push(root.val);

        helper(root.left, levels, levelNum + 1);
        helper(root.right, levels, levelNum + 1);
    }
    helper(root, levels, 0);
    return levels;
};