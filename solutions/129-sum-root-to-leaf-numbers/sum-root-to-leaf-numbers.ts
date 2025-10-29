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

    function preorderDFS(node: TreeNode | null, pathNum: number): void {

        if(node === null) {
            return;
        }

        pathNum = pathNum * 10 + node.val;

        if(node.left === null && node.right === null) {
            sum += pathNum;
            return;
        }

        preorderDFS(node.left, pathNum);
        preorderDFS(node.right, pathNum);

    }

    preorderDFS(root, 0);

    return sum;
    
};