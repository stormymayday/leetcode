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
    const newNode = new TreeNode(val);

    if(root === null) {
        root = newNode;
    } else {
        let curr: TreeNode = root;
        while(true) {
            if(val < curr.val) {
                if(curr.left !== null) {
                    curr = curr.left;
                } else {
                    curr.left = newNode;
                    break;
                }
            } else if(val > curr.val) {
                if(curr.right !== null) {
                    curr = curr.right;
                } else {
                    curr.right = newNode;
                }
            } else {
                // duplicate, shouldn't happen
                break;
            }
        }
    }

    return root;
};