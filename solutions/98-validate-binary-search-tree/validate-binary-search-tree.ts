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

function isValidBST(root: TreeNode | null): boolean {

    if(!root) {
        return true;
    }

    const numbers = [];
    // traverse and fill in the numbers array
    function traverseInOrder(root) {
        if(root === null) {
            return;
        }
        traverseInOrder(root.left);
        numbers.push(root.val);
        traverseInOrder(root.right);
    }
    traverseInOrder(root); // kick off the recursion

    if(numbers.length < 2) {
        return true;
    }

    for(let i = 1; i < numbers.length; i++) {
        if(numbers[i] <= numbers[i - 1]) {
            return false;
        }
    }
    return true;
    
};