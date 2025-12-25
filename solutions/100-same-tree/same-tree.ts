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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    
    function helper(pNode: TreeNode | null, qNode: TreeNode | null): boolean {

        if(pNode === null && qNode === null) {
            return true;
        }

        if(pNode === null || qNode === null) {
            return false;
        }

        if(pNode.val !== qNode.val) {
            return false;
        }

        return helper(pNode.left, qNode.left) && helper(pNode.right, qNode.right);

    }

    return helper(p, q);

};