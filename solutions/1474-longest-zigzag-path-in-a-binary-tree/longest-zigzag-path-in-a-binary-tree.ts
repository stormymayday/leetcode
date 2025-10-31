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

function longestZigZag(root: TreeNode | null): number {

    let maxPathLength: number = 0;

    if (root === null) {
        return maxPathLength;
    }

    const stack: [TreeNode, string, number][] = [[root, 'root', 0]]; // [node, from/direction, current path length]

    while (stack.length > 0) {

        const [currNode, from, currPathLength] = stack.pop();

        maxPathLength = Math.max(maxPathLength, currPathLength);

        if (currNode.left !== null) {

            if (from === 'right') {
                // if current node came from 'right', extend path by 1
                stack.push([currNode.left, 'left', currPathLength + 1]);
            } else {
                // otherwise, reset path to 1
                stack.push([currNode.left, 'left', 1]);
            }

        }

        if (currNode.right !== null) {

            if (from === 'left') {
                // if current node came from 'left', extend path by 1
                stack.push([currNode.right, 'right', currPathLength + 1]);
            } else {
                // otherwise, reset path to 1
                stack.push([currNode.right, 'right', 1]);
            }

        }

    }

    return maxPathLength;

};