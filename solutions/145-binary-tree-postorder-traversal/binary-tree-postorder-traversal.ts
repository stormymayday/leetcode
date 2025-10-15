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

function postorderTraversal(root: TreeNode | null): number[] {

    const res: number[] = [];

    if (root === null) {
        return res;
    }

    const stack: [TreeNode, boolean][] = [[root, false]];

    while (stack.length > 0) {

        const [currNode, visited] = stack.pop();

        if (visited === true) {
            res.push(currNode.val);
        } else {

            stack.push([currNode, true]);

            if (currNode.right) {
                stack.push([currNode.right, false]);
            }
            if (currNode.left) {
                stack.push([currNode.left, false]);
            }
        }
    }

    return res;
};