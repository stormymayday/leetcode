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

function buildTree(
    preorder: number[],
    inorder: number[],
    inorderStart: number = 0,
    inorderEnd: number = inorder.length - 1,
    preorderStart: number = 0,
    preorderEnd: number = preorder.length - 1
): TreeNode | null {
    
    // Base Case: start and end pointers have crossed
    if(inorderStart > inorderEnd) {
        return null;
    }

    const value = preorder[preorderStart];
    const root = new TreeNode(value);
    const mid = inorder.indexOf(value); // problematic: O(n)

    // of the inorder
    const leftSize = mid - inorderStart;

    // Build Left Subtree
    root.left = buildTree(
        preorder,
        inorder,
        inorderStart, // stays the same
        mid - 1, // inorderEnd: one before current mid
        preorderStart + 1, // skip one (root)
        preorderStart + leftSize // preorderEnd: current preorderStart + leftSize
    );

    // Build Right Subtree
    root.right = buildTree(
        preorder,
        inorder,
        mid + 1, //inorderStart: one after current mid 
        inorderEnd, // stays the same
        preorderStart + leftSize + 1, // preOrderStart: same as left but + 1
        preorderEnd, // stays the same
    );

    return root;

};