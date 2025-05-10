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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

    if(preorder.length === 0) {
        return null;
    }

    const value = preorder[0];
    const root = new TreeNode(value);

    const mid = inorder.indexOf(value);

    const leftIn = inorder.slice(0, mid);
    const rightIn = inorder.slice(mid + 1);

    const leftPre = preorder.slice(1, leftIn.length + 1);
    const rightPre = preorder.slice(leftIn.length + 1);

    root.left = buildTree(leftPre, leftIn);
    root.right = buildTree(rightPre, rightIn);

    return root;
    
};