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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    const inOrderIndex = {};
    for(let i = 0; i < inorder.length; i += 1) {
        const value = inorder[i];
        inOrderIndex[value] = i;
    }

    function helper(inOrderStart, inOrderEnd, postOrderStart, postOrderEnd) {

        if(inOrderStart > inOrderEnd) {
            return null;
        }

        const rootVal = postorder[postOrderEnd];
        const root = new TreeNode(rootVal);
        const mid = inOrderIndex[rootVal];

        root.left = helper(inOrderStart, mid - 1, postOrderStart, (postOrderStart + (mid - inOrderStart) - 1));
        root.right = helper(mid + 1, inOrderEnd, (postOrderStart + (mid - inOrderStart)), postOrderEnd - 1);

        return root;

    }
    return helper(0, inorder.length - 1, 0, postorder.length - 1);
};