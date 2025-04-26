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

    if(!root) {
        root = newNode;
        return root;
    }

    let current = root;
    while(true) {
        if(val < current.val) {
            if(current.left === null) {
                current.left = newNode;
                return root;
            } else {
                current = current.left;
            }
        } else if(val > current.val) {
            if(current.right === null) {
                current.right = newNode;
                return root;
            } else {
                current = current.right;
            }
        } else {
            return root;
        }
    }

    return root;
    
};