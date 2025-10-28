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

function minDiffInBST(root: TreeNode | null): number {

    let minDiff: number = Infinity;

    if(root === null) {
        return minDiff;
    }

    // let prev: TreeNode | null = null;
    function inorderDFS(node: TreeNode | null, prev: TreeNode | null): TreeNode | null {
        if(node === null) {
            return prev;
        }
        const prevNode = inorderDFS(node.left, prev);
        if(prevNode !== null) {
            minDiff = Math.min(minDiff, node.val - prevNode.val);
        }
        return inorderDFS(node.right, node);
    }
    inorderDFS(root, null);

    return minDiff;

};