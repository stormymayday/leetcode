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

    let idx = 0;
    
    function helper(leftBound: number, rightBound: number): TreeNode | null {

        if(idx === preorder.length || (preorder[idx] <= leftBound || preorder[idx] >= rightBound)) {
            return null;
        }

        const root = new TreeNode(preorder[idx]);
        idx += 1;
        root.left = helper(leftBound, root.val);
        root.right = helper(root.val, rightBound);
        return root;

    }

    return helper(-Infinity, Infinity);

};