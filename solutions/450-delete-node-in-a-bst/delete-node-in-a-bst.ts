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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {

    function helper(node: TreeNode | null, key: number): TreeNode | null {

        if(node === null) {
            return null;
        }

        if(key < node.val) {
            node.left = helper(node.left, key);
        } else if(key > node.val) {
            node.right = helper(node.right, key);
        } else {
            // node has no childrem
            if(node.left === null && node.right === null) {
                node = null;
            } 
            // node has no left
            else if(node.left === null) {
                node = node.right;
            } 
            // node has no right
            else if(node.right === null) {
                node = node.left;
            } 
            // node has both children
            else {
                // Predecessor
                // let predecessor = node.left;
                // while(predecessor.right !== null) {
                //     predecessor = predecessor.right;
                // }
                // node.val = predecessor.val;
                // node.left = helper(node.left, predecessor.val);

                // Successor
                let successor = node.right;
                while(successor.left !== null) {
                    successor = successor.left;
                }
                node.val = successor.val;
                node.right = helper(node.right, successor.val);
            }

        }

        return node;

    }

    root = helper(root, key);

    return root;
    
};