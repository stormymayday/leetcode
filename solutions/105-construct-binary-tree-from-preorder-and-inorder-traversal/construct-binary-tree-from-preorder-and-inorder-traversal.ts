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

    if(preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    const rootIdx = inorder.indexOf(rootVal);

    root.left = buildTree(preorder.slice(1, rootIdx + 1), inorder.slice(0, rootIdx));
    root.right = buildTree(preorder.slice(rootIdx + 1), inorder.slice(rootIdx + 1));

    return root; 
};