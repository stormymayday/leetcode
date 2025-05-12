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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {

    if(!root) {
        return root;
    }

    function traversePreOrder(root) {
        // Base Case
        if(root === null) {
            return null;
        }

        // 1. Visit Node
        if(root.val === val) {
            return root;
        }

        // 2. Traverse Left
        if(root.val > val) {
            return traversePreOrder(root.left);
        }
        

        // 3. Traverse Right
        if(root.val < val) {
            return traversePreOrder(root.right);
        }
        
    }
    
    return traversePreOrder(root);

};