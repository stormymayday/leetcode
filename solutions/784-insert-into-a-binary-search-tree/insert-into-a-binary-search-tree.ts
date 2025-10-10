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

function insertIntoBST(root: TreeNode | null, val: number): TreeNode | null {

    // Edge Case: null root
    if(root === null) {
        const newNode = new TreeNode(val);
        return newNode;
    }

    let curr: TreeNode | null = root;

    while(true) {

        if(val < curr.val) {

            if(curr.left === null) {
                const newNode = new TreeNode(val);
                curr.left = newNode;
                break;
            } else {
                curr = curr.left;
            }

        } else if(val > curr.val) {

            if(curr.right === null) {
                const newNode = new TreeNode(val);
                curr.right = newNode;
                break;
            } else {
                curr = curr.right;
            }

        }

    }

    return root;
    
};