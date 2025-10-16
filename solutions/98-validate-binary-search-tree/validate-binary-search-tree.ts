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

    if(root === null) {
        return true;
    }

    const inorder: number[] = [];

    function helperDFS(node: TreeNode | null): void {
        if(node === null) {
            return;
        }
        helperDFS(node.left);
        inorder.push(node.val);
        helperDFS(node.right);
    }

    helperDFS(root);

    for(let i = 0; i < inorder.length - 1; i += 1) {
        if(inorder[i] >= inorder[i + 1]) {
            return false;
        }
    }

    return true;
    
};