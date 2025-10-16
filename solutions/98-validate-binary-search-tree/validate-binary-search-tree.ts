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

    let prev: number | null = null;

    function helperDFS(node: TreeNode | null): boolean {

        if(node === null) {
            return true;
        }

        if(helperDFS(node.left) === false) {
            return false;
        }

        if(prev !== null && node.val <= prev) {
            return false;
        }
        prev = node.val;

        return helperDFS(node.right);

    }

    return helperDFS(root);

};