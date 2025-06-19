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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

    const inOrderIndex = {};
    for(let i = 0; i < inorder.length; i += 1) {
        const value = inorder[i];
        inOrderIndex[value] = i;
    }

    function helper(inOrderStart, inOrderEnd, preOrderStart, preOrderEnd) {
        if(inOrderStart > inOrderEnd) {
            return null;
        }

        const rootVal = preorder[preOrderStart];
        const root = new TreeNode(rootVal);

        const mid = inOrderIndex[rootVal];

        root.left = helper(inOrderStart, mid - 1, preOrderStart + 1, preOrderStart + (mid - inOrderStart));
        root.right = helper(mid + 1, inOrderEnd, preOrderStart + (mid - inOrderStart) + 1, preOrderEnd);

        return root;
    }

    return helper(0, inorder.length - 1, 0, preorder.length - 1);
};