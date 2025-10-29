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

function sumNumbers(root: TreeNode | null): number {

    let sum: number = 0;

    if(root === null) {
        return sum;
    }

    const stack: [TreeNode, number][] = [[root, 0]];

    while(stack.length > 0) {

        let [currNode, pathNum] = stack.pop();

        pathNum = pathNum * 10 + currNode.val;

        if(currNode.left === null && currNode.right === null) {
            sum += pathNum;
        } else {
            if(currNode.left !== null) {
                stack.push([currNode.left, pathNum]);
            }
            if(currNode.right !== null) {
                stack.push([currNode.right, pathNum]);
            }
        }

    }

    return sum;
    
};