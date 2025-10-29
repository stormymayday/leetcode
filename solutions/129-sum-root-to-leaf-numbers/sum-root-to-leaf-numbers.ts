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

    function preorderDFS(node: TreeNode | null, pathNum: number): number {

        if(node === null) {
            return 0;
        }

        pathNum = pathNum * 10 + node.val;

        if(node.left === null && node.right === null) {
            return pathNum;
        }

        return preorderDFS(node.left, pathNum) + preorderDFS(node.right, pathNum);

    }

    return preorderDFS(root, 0);
    
};