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

    const inorder: TreeNode[] = [];

    function inorderDFS(node: TreeNode | null): void {
        if (node === null) {
            return;
        }
        inorderDFS(node.left);
        inorder.push(node);
        inorderDFS(node.right);
    }

    inorderDFS(root);

    let node1: TreeNode | null = null;
    let node2: TreeNode | null = null;
    for (let i = 0; i < inorder.length - 1; i += 1) {

        // Found a node(s) that is not in order
        if (inorder[i].val > inorder[i + 1].val) {
            // First discrepancy, setting both nodes incase only these two adjacent nodes need to be swapped
            // Example: [1, 3, 2, 4] -> 3 and 2
            if (node1 === null) {
                node1 = inorder[i]; // will stay the same
                node2 = inorder[i + 1]; // can change if another discrepancy is found
            }
            // Second discrepancy, not adjacent nodes
            // Example [4, 2, 3, 1] -> 4 and 1
            // Initially, node1 -> 4 and node2 -> 2
            // Second time: (comparing 3 and 1) node1 -> 4 and node -> 1
            else {
                node2 = inorder[i + 1];
                break; // there can only be two discrepancies at most
            }

        }

    }

    // Optional Guard Statement
    if (node1 !== null && node2 !== null) {
        const temp = node1.val;
        node1.val = node2.val;
        node2.val = temp;
    }

};