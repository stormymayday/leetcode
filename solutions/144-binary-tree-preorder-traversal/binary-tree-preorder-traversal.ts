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

function preorderTraversal(root: TreeNode | null): number[] {
    const path: number[] = [];
    preorderDFS(root, path);
    return path;
};

function preorderDFS(root: TreeNode | null, path: number[]): void {

    // Base Case: 
    if(root === null) {
        return;
    }
    
    // Visit
    path.push(root.val);

    // Recurse Left
    preorderDFS(root.left, path);

    // Recurse Right
    preorderDFS(root.right, path);

}