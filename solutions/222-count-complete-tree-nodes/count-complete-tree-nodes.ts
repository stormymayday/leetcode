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

function countNodes(root: TreeNode | null): number {

    if(root === null) {
        return 0;
    }

    let leftHeight: number = 1;
    let curr: TreeNode | null = root;
    while(curr.left !== null) {
        leftHeight += 1;
        curr = curr.left;
    }

    let rightHeight: number = 1;
    curr = root;
    while(curr.right !== null) {
        rightHeight += 1;
        curr = curr.right;
    }

    if(leftHeight !== rightHeight) {
        return 1 + countNodes(root.left) + countNodes(root.right);
    } else {
        return Math.pow(2, leftHeight) - 1;
    }

};