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

function invertTree(root: TreeNode | null): TreeNode | null {

    if(root === null) {
        return null;
    }

    const stack: TreeNode[] = [root];
    while(stack.length > 0) {

        const currNode = stack.pop();

        const temp: TreeNode | null = currNode.left;
        currNode.left = currNode.right;
        currNode.right = temp;

        if(currNode.left !== null) {
            stack.push(currNode.left);
        }

        if(currNode.right !== null) {
            stack.push(currNode.right);
        }

    }
    
    return root;

};