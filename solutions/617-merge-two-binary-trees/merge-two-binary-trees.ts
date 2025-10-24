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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {

    if(root1 === null && root2 === null) {
        return null;
    }

    const node = new TreeNode((root1 !== null ? root1.val : 0) + (root2 !== null ? root2.val : 0));

    node.left = mergeTrees(root1 !== null ? root1.left : null, root2 !== null ? root2.left : null);
    node.right = mergeTrees(root1 !== null ? root1.right : null, root2 !== null ? root2.right : null);

    return node;
    
};