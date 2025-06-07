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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    const leafList1 = leafList(root1);
    const leafList2 = leafList(root2);

    if(leafList1.length !== leafList2.length) {
        return false;
    }

    for(let i = 0; i < leafList1.length; i += 1) {
        if(leafList1[i] !== leafList2[i]) {
            return false;
        }
    }

    return true;
};

function leafList(root) {
    const result = [];
    function helper(root) {
        if(root === null) {
            return;
        }
        if(root.left === null && root.right === null) {
            result.push(root.val);
        }
        helper(root.left);
        helper(root.right);
    }
    helper(root);
    return result;
}