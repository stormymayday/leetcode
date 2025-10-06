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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {

    // Base Case 1: null node
    if(root === null) {
        return null;
    }

    // Base Case 2: root is 'p' or 'q'
    if(root === p || root === q) {
        return root;
    }

    // Can combine
    // if(root === null || root === p || root === q) {
    //     return root;
    // }

    // Recurse Left
    const left = lowestCommonAncestor(root.left, p, q);

    // Recurse Right
    const right = lowestCommonAncestor(root.right, p, q);

    // If both left and right are not null, then current node (root) is the LCA
    if(left !== null && right !== null) {
        return root;
    }

    // If both left and right are null, return null, LCA is not on this subtree
    if(left === null && right === null) {
        return null;
    }

    // Otherwise, LCA is either 'left' or 'right'. Whichever one is not null
    return left !== null ? left : right;
	
};