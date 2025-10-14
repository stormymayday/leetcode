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

function hasPathSum(root: TreeNode | null, targetSum: number): boolean {

    if(root === null) {
        return false;
    }

    const stack: [TreeNode, number][] = [[root, root.val]];

    while(stack.length > 0) {

        const [currNode, currSum] = stack.pop();

        if(currNode.left === null && currNode.right === null) {
            if(currSum === targetSum) {
                return true;
            }
        }

        if(currNode.left !== null) {
            stack.push([currNode.left, currSum + currNode.left.val]);
        }

        if(currNode.right !== null) {
            stack.push([currNode.right, currSum + currNode.right.val]);
        }
        
    }

    return false;
    
};