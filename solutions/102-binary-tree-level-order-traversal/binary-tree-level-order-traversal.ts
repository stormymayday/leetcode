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

    // Edge Case: empty root
    if(!root) {
        return [];
    }

    const levels = [];

    // helper
    function fillLevels(root, levelsArray, currentLevel) {

        // Base Case: if root is null, simply return
        if(root === null) {
            return;
        }

        // Otherwise, process the root
        if(levelsArray[currentLevel] === undefined) {
            // Inialize an empty array at the current level (index) if it does not exist
            levelsArray[currentLevel] = [];
        }
        // push the current root val into the designated subarray
        levelsArray[currentLevel].push(root.val);

        // Recurse Left incrementing the current level
        fillLevels(root.left, levelsArray, currentLevel + 1);

        // Recurse Right incrementing the current leve
        fillLevels(root.right, levelsArray, currentLevel + 1);

    }

    // kick off the recurions at the root (level 0)
    fillLevels(root, levels, 0);

    return levels;
    
};