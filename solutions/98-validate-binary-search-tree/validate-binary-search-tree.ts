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

function isValidBST(root: TreeNode | null): boolean {

    if (root === null || (root.left === null && root.right === null)) {
        return true;
    }

    const stack: TreeNode[] = [];
    let curr: TreeNode | null = root;
    let prev: TreeNode | null = null;
    while(curr !== null || stack.length > 0) {

        while(curr !== null) {
            stack.push(curr);
            curr = curr.left;
        }

        curr = stack.pop();
        if(prev !== null && prev.val >= curr.val) {
            return false;
        }
        prev = curr;
        curr = curr.right;
    }

    return true;

};