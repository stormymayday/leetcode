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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {

    if(root === null) {
        return null;
    }

    const stack: TreeNode[] = [root];

    while(stack.length > 0) {

        const currNode = stack.pop();

        if(val < currNode.val) {
            if(currNode.left) {
                stack.push(currNode.left);
            }
        } else if(val > currNode.val) {
            if(currNode.right) {
                stack.push(currNode.right);
            }
        } else {
            return currNode;
        }

    }

    return null;
    
};