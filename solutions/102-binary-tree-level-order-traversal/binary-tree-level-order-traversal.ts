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

    if(!root) {
        return [];
    }

    const levels = [];

    function helper(root, level) {
        // Base Case
        if(root === null) {
            return;
        }

        // Visit Node
        if(levels[level] === undefined) {
            levels.push([root.val]);
        } else {
            levels[level].push(root.val);
        }

        // Recurse Left
        helper(root.left, level + 1);
        // Recurse Right
        helper(root.right, level + 1);

    }

    helper(root, 0);

    return levels;
    
};