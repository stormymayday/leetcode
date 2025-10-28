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

function largestValues(root: TreeNode | null): number[] {
    
    const res: number[] = [];

    function inorderDFS(node: TreeNode | null, level: number):void {
        if(node === null) {
            return;
        }
        if(res.length === level) {
            res.push(node.val);
        }
        res[level] = Math.max(res[level], node.val);
        inorderDFS(node.left, level + 1);
        inorderDFS(node.right, level + 1);
    }

    inorderDFS(root, 0);

    return res;

};