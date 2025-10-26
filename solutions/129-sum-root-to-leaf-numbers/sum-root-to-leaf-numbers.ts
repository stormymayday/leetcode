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

function sumNumbers(root: TreeNode | null): number {

    let sum: number = 0;

    if(root === null) {
        return sum;
    }
    
    // Phase 1: Get all the 'paths' using backtracking
    const allPaths: string[][] = [];
    function backtrack(node: TreeNode | null, path: string[]): void {
        if(node === null) {
            return;
        }
        if(node.left === null && node.right === null) {
            path.push(`${node.val}`);
            allPaths.push([...path]);
            path.pop(); // backtrack
            return;
        }
        path.push(`${node.val}`);
        backtrack(node.left, path);
        backtrack(node.right, path);
        path.pop(); // backtrack
    }
    backtrack(root, []);

    // Phase 2: Get the sum by parsing 'allPaths'
    for(const path of allPaths) {
        sum += Number(path.join(""));
    }
    return sum;
    
};