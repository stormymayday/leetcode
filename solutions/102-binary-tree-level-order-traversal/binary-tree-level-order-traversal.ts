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

function levelOrder(root: TreeNode | null): number[][] {

    const res: number[][] = [];
    
    if(root === null) {
        return res;
    }

    function helperDFS(root: TreeNode | null, level: number): void {

        if(root === null) {
            return;
        }

        if(res[level] === undefined) {
            res[level] = [];
        }
        res[level].push(root.val);

        helperDFS(root.left, level + 1);
        helperDFS(root.right, level + 1);

    }

    helperDFS(root, 0);

    return res;
    
};