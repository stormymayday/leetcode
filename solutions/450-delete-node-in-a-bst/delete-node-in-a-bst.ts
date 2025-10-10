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

function helper(val, currentNode) {

    if(currentNode === null) {
        return null;
    }

    if(val < currentNode.val) {
        currentNode.left = helper(val, currentNode.left);
    } else if(val > currentNode.val) {
        currentNode.right = helper(val, currentNode.right);
    } else {
        if(currentNode.left === null && currentNode.right === null) {
            return null;
        } else if(currentNode.left === null) {
            currentNode = currentNode.right;
        } else if(currentNode.right === null) {
            currentNode = currentNode.left;
        } else {
            const subTreeMin = minval(currentNode.right);
            currentNode.val = subTreeMin;
            currentNode.right = helper(subTreeMin, currentNode.right);
        }
    }

    return currentNode;
}
function minval(currentNode) {
    while(currentNode.left !== null) {
        currentNode = currentNode.left;
    }
    return currentNode.val;
}
function deleteNode(root: TreeNode | null, key: number): TreeNode | null {
    root = helper(key, root);
    return root;
};