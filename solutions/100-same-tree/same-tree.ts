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

function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {

    const stack: [TreeNode | null, TreeNode | null][] = [[p, q]];

    while (stack.length > 0) {

        const [pNode, qNode] = stack.pop();

        // Both nodes are null
        if (pNode === null && qNode === null) {
            continue;
        }

        // Only one is null OR values are different
        if (
            (pNode === null || qNode === null) ||
            (pNode.val !== qNode.val)
        ) {
            return false;
        }

        // Otherwise, push children on to the stack (even if they are null)
        stack.push([pNode.left, qNode.left]);
        stack.push([pNode.right, qNode.right]);

    }

    return true;

};