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

function inorderTraversal(root: TreeNode | null): number[] {
    const path: number[] = [];
    inorderRDFS(root, path);
    return path;
};

function inorderRDFS(root: TreeNode | null, path: number[]): void {

    // Base Case
    if(root === null) {
        return;
    }

    // Recurse Left
    inorderRDFS(root.left, path);

    // Visit
    path.push(root.val);

    // Recurse Right
    inorderRDFS(root.right, path);

}