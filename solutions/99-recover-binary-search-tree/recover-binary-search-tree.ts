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

    let prev: TreeNode | null = null;
    function inorderDFS(node: TreeNode | null): void {
        if(node === null) {
            return;
        }
        inorderDFS(node.left);
        if(prev !== null) {
            if(prev.val > node.val) {
                if(node1 === null) {
                    node1 = prev;
                    node2 = node;
                } else {
                    node2 = node;
                    return;
                }
            }
        }
        prev = node;
        inorderDFS(node.right);
    }
    inorderDFS(root);
    const temp = node1.val;
    node1.val = node2.val;
    node2.val = temp;
    
};