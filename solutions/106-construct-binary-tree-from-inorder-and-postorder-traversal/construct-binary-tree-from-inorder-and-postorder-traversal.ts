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

    const inorderIndexMap = new Map();
    for(let i = 0; i < inorder.length; i++) {
        inorderIndexMap.set(inorder[i], i);
    }

    function helper(
        inorder,
        postorder,
        inorderIndexMap,
        inorderStart = 0,
        inorderEnd = inorder.length - 1,
        postorderStart = 0,
        postorderEnd = postorder.length - 1
    ) {

        // Base Case
        if (inorderStart > inorderEnd) {
            return null;
        }

        const value = postorder[postorderEnd];
        const root = new TreeNode(value);
        const mid = inorderIndexMap.get(value);
        const leftSize = mid - inorderStart;

        root.left = helper(
            inorder,
            postorder,
            inorderIndexMap,
            inorderStart, // stays the same
            mid - 1, // inorderEnd
            postorderStart, // stays the same
            postorderStart + leftSize - 1 // Postorder end index is inclusive, so it must be one before the right subtree start.
        );

        root.right = helper(
            inorder,
            postorder,
            inorderIndexMap,
            mid + 1,
            inorderEnd, // stays the same
            postorderStart + leftSize, // The right subtree starts immediately after the left subtree in postorder traversal.
            postorderEnd - 1
        );

        return root;
    }

    return helper(inorder, postorder, inorderIndexMap);
    
};