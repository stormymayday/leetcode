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

function isValidBST(root: TreeNode | null): boolean {

    // Edge Case 1: empty tree is valid
    if(!root) {
        return true;
    }

    // Get the tree values into an array using DFS InOrder traversal
    const result = [];
    function DFSInOrder(root) {
        // 1. Traverse Left
        if(root.left) {
            DFSInOrder(root.left);
        }
        // 2. Visit Node
        result.push(root.val);
        // 3. Traverse Right
        if(root.right) {
            DFSInOrder(root.right);
        }
    }
    DFSInOrder(root);

    // Edge Case 2: only one node is valid
    if(result.length < 2) {
        return true;
    }

    for(let i = 1; i < result.length; i++) {
        if(result[i] <= result[i - 1]) {
            return false;
        }
    }
    return true;
    
};