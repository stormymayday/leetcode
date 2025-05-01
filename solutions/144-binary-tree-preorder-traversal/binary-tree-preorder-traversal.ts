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

function preorderTraversal(root: TreeNode | null): number[] {

    // Edge Case: Empty Root
    if(!root) {
        return [];
    }

    const result = [];
    const stack = [root];

    while(stack.length > 0) {
        const currentNode = stack.pop();
        result.push(currentNode.val);
       
        if(currentNode.right) {
            stack.push(currentNode.right);
        }
         // We push 'left' last to 'pop' it first
        if(currentNode.left) {
            stack.push(currentNode.left);
        }
    }

    return result;
    
};