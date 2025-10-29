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

function pathSum(root: TreeNode | null, targetSum: number): number[][] {

    const allPaths: number[][] = [];

    if(root === null) {
        return allPaths;
    }

    function backtrackDFS(node: TreeNode | null, sum: number, path: number[]): void {

        if(node === null) {
            return;
        }
        
        path.push(node.val);
        sum += node.val;

        if(node.left === null && node.right === null && sum === targetSum) {
            allPaths.push([...path]);
            path.pop();
            return;
        }

        backtrackDFS(node.left, sum, path);
        backtrackDFS(node.right, sum, path);

        path.pop(); // backtrack

    }

    backtrackDFS(root, 0, []);

    return allPaths;
    
};