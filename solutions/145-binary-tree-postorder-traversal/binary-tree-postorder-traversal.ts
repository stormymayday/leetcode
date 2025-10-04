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

function postorderTraversal(root: TreeNode | null): number[] {
    const path: number[] = [];
    postorderRDFS(root, path);
    return path;
};

function postorderRDFS(root: TreeNode | null, path: number[]): void {
    // Base Case
    if(root === null) {
        return;
    }

    // Recurse Left
    postorderRDFS(root.left, path);
    
    // Recurse Right
    postorderRDFS(root.right, path);

    // Visit
    path.push(root.val);
}