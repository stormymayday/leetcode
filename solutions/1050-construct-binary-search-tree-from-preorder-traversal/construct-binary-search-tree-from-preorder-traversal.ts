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

function bstFromPreorder(preorder: number[]): TreeNode | null {
    
    function helper(idx: number[], leftBound: number, rightBound: number): TreeNode | null {

        if(idx[0] === preorder.length || (preorder[idx[0]] < leftBound || preorder[idx[0]] >= rightBound)) {
            return null;
        }

        const root = new TreeNode(preorder[idx[0]]);
        idx[0] += 1;
        root.left = helper(idx, leftBound, root.val);
        root.right = helper(idx, root.val, rightBound);
        return root;

    }

    return helper([0], -Infinity, Infinity);

};