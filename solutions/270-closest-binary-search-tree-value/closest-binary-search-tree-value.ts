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

function closestValue(root: TreeNode | null, target: number): number {

    let res: number = Infinity;

    // Edge Case Lol
    if(root === null) {
        return res;
    }

    const inorder: number[] = [];

    function dfs(node: TreeNode | null): void {
        if(node === null) {
            return;
        }
        dfs(node.left);
        inorder.push(node.val);
        dfs(node.right);
    }
    dfs(root);

    let minDiff: number = Infinity;

    for(let i = 0; i < inorder.length; i += 1) {

        const absDiff = Math.abs(target - inorder[i]);

        // The smaller the difference the closer is the value to the target
        // 
        if((absDiff < minDiff) || (absDiff === minDiff && inorder[i] < res)) {
            minDiff = absDiff;
            res = inorder[i];
        }
    }

    return res;
    
};