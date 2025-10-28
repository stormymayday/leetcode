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

    function inorderDFS(node: TreeNode | null, prev: TreeNode | null, minDiff: number): [TreeNode | null, number] {
        if(node === null) {
            return [prev, minDiff];
        }
        let [prevNode, currMinDiff] = inorderDFS(node.left, prev, minDiff);
        if(prevNode !== null) {
            currMinDiff = Math.min(currMinDiff, node.val - prevNode.val);
        }
        return inorderDFS(node.right, node, currMinDiff);
    }
    return inorderDFS(root, null, Infinity)[1];

};