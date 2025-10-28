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

    if (root === null) {
        return;
    }

    let node1: TreeNode | null = null;
    let node2: TreeNode | null = null;

    let prev: TreeNode | null = null;
    let curr: TreeNode | null = root;
    while (curr !== null) {
        if (curr.left === null) {
            if (prev !== null && prev.val > curr.val) {
                if (node1 === null) {
                    node1 = prev;
                    node2 = curr;
                } else {
                    node2 = curr;
                }
            }
            prev = curr;
            curr = curr.right;
        } else {
            let predecessor = curr.left;
            while (predecessor.right !== null && predecessor.right !== curr) {
                predecessor = predecessor.right;
            }
            if (predecessor.right === null) {
                predecessor.right = curr;
                curr = curr.left;
            } else {
                predecessor.right = null;
                if (prev !== null && prev.val > curr.val) {
                    if (node1 === null) {
                        node1 = prev;
                        node2 = curr;
                    } else {
                        node2 = curr;
                    }
                }
                prev = curr;
                curr = curr.right;
            }
        }
    }
    const temp = node1.val;
    node1.val = node2.val;
    node2.val = temp;

};