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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    if(inorder.length === 0) {
        return null;
    }

    const rootVal = postorder[postorder.length - 1];
    const root = new TreeNode(rootVal);
    const mid = inorder.indexOf(rootVal);

    const inOrderLeft = inorder.slice(0, mid);
    const inOrderRight = inorder.slice(mid + 1);

    const postOrderLeft = postorder.slice(0, inOrderLeft.length);
    const postOrderRight = postorder.slice(inOrderLeft.length, -1);

    root.left = buildTree(inOrderLeft, postOrderLeft);
    root.right = buildTree(inOrderRight, postOrderRight);
    
    return root;
};