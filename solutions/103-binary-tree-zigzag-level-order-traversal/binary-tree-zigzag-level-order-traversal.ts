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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    
    const res: number[][] = [];

    function dfs(node: TreeNode | null, level: number): void {
        if(node === null) {
            return;
        }
        if(res.length === level) {
            res.push([node.val]);
        } else {
            res[level].push(node.val);
        }
        dfs(node.left, level + 1);
        dfs(node.right, level + 1);
    }
    dfs(root, 0);

    for(let i = 0; i < res.length; i += 1) {
        if(i % 2 !== 0) {
            res[i].reverse();
        }
    }
    return res;

};