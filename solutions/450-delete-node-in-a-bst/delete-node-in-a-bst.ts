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

    function helper(node: TreeNode | null, val: number): TreeNode | null {
        // Base Case: node is null
        if(node === null) {
            return null;
        }

        // target could be in the left subtree
        if(val < node.val) {
            node.left = helper(node.left, val);
        } 
        // target could be in the right subtree
        else if(val > node.val) {
            node.right = helper(node.right, val);
        } 
        // current node is the target
        else {
            // node has no children
            // Note: technically not a necessary check since the next check will assign 'null' from the right subtree
            if(node.left === null && node.right === null) {
                node = null;
            } 
            // node has no left subtree
            else if(node.left === null) {
                // replace node with it's right subtree
                node = node.right;
            } 
            // node has no right subtree
            else if(node.right === null) {
                // replace node with it's left subtree
                node = node.left;
            }
            // otherwise, node must have both children
            else {
                // 1. Get 'successor' of the current node
                const successor = getSuccessor(node);

                // 2. Overwrite node's val with successor's val
                node.val = successor.val;

                // 3. Recursively delete the successor using it's value
                // Node: successor is in the right subtree
                node.right = helper(node.right, successor.val);
            }
        }

        return node;

    }

    return helper(root, key);
    
};

function getSuccessor(node: TreeNode | null): TreeNode | null {

    if(node === null || node.right === null) {
        return null;
    }

    let curr = node.right;
    while(curr.left !== null) {
        curr = curr.left;
    }
    return curr;

}