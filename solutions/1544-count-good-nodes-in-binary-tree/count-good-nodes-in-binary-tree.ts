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

function goodNodes(root: TreeNode | null): number {

    let count = 0;

    if (root === null) {
        return count;
    }

    const stack: [TreeNode, number][] = [[root, root.val]];

    while(stack.length > 0) {

        let [currNode, currMax] = stack.pop();

        if(currNode.val >= currMax) {
            count += 1;
            currMax = currNode.val;
        }

        if(currNode.left !== null) {
            stack.push([currNode.left, currMax]);
        }

        if(currNode.right !== null) {
            stack.push([currNode.right, currMax]);
        }

    }

    return count;

};