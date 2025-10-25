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

/**
 Do not return anything, modify root in-place instead.
 */
function recoverTree(root: TreeNode | null): void {

    if(root === null) {
        return;
    }

    let node1: TreeNode | null = null;
    let node2: TreeNode | null = null;

    function inorderDFS(node: TreeNode | null, prev: TreeNode | null): TreeNode | null {

        if(node === null) {
            return prev; // IMPORTANT! must return 'prev'
        }

        const prevNode = inorderDFS(node.left, prev);

        if(prevNode !== null) {
            // Discrepancy found!
            if(prevNode.val > node.val) {
                // First time: set both
                if(node1 === null) {
                    node1 = prevNode;
                    node2 = node;
                } 
                // Second time: update second
                else {
                    node2 = node;
                }
            }
        }

        return inorderDFS(node.right, node);

    }

    inorderDFS(root, null);

    // Optional Guard
    if(node1 !== null && node2 !== null) {
        const temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }
    
};