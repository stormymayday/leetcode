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

function countUnivalSubtrees(root: TreeNode | null): number {
    return dfs(root)[1];
}

function dfs(root: TreeNode | null): [boolean, number] {
    // Base Case 1: null node
    if(root === null) {
        return [true, 0];
    }

    // Base Case 2: leaf node
    if(root.left === null && root.right === null) {
        return [true, 1];
    }

    const left = dfs(root.left);
    const right = dfs(root.right);

    // Start with the counts from left and right subtrees
    let count = left[1] + right[1];
    
    // Check if current subtree is uni-value
    let isUniValue = left[0] && right[0];
    
    if(isUniValue) {
        // Also need to check if children values match parent
        if(root.left !== null && root.left.val !== root.val) {
            isUniValue = false;
        }
        if(root.right !== null && root.right.val !== root.val) {
            isUniValue = false;
        }
        
        // If still uni-value, increment count
        if(isUniValue) {
            count += 1;
        }
    }
    
    return [isUniValue, count];
}