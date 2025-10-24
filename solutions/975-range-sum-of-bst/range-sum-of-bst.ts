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

function rangeSumBST(root: TreeNode | null, low: number, high: number): number {

    let sum = 0;

    if(root === null) {
        return sum;
    }

    const stack: TreeNode[] = [root];
    while(stack.length > 0) {
        const currNode = stack.pop();

        if(currNode.val >= low && currNode.val <= high) {
            sum += currNode.val;
        }

        if(currNode.val > low && currNode.left !== null) {
            stack.push(currNode.left);
        }

        if(currNode.val < high && currNode.right !== null) {
            stack.push(currNode.right);
        }
    }

    return sum;
    
};