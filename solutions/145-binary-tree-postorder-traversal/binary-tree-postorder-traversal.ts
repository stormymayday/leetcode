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

    const stack: TreeNode[] = [root];
    const visited: boolean[] = [false];

    while (stack.length > 0) {

        const currNode = stack.pop();
        const wasVisited = visited.pop();

        if (wasVisited === true) {
            res.push(currNode.val);
        } else {

            stack.push(currNode);
            visited.push(true);

            if (currNode.right !== null) {
                stack.push(currNode.right);
                visited.push(false);
            }
            if (currNode.left !== null) {
                stack.push(currNode.left);
                visited.push(false);
            }
        }
    }

    return res;
};