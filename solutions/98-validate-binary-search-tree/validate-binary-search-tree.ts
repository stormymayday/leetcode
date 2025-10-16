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

    if (root === null || (root.left === null && root.right === null)) {
        return true;
    }

    const stack: [TreeNode, number, number][] = [[root, -Infinity, Infinity]];

    while (stack.length > 0) {

        const [currNode, leftBound, rightBound] = stack.pop();

        if (currNode.val <= leftBound || currNode.val >= rightBound) {
            return false;
        }

        if (currNode.left !== null) {
            stack.push([currNode.left, leftBound, currNode.val]);
        }

        if (currNode.right !== null) {
            stack.push([currNode.right, currNode.val, rightBound]);
        }

    }

    return true;

};