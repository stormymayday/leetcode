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

function isValidBST(root: TreeNode | null): boolean {
    const result = dfsInOrder(root);
    if(result.length < 2) {
        return true;
    }
    for(let i = 0; i < result.length - 1; i += 1) {
        if(result[i] >= result[i + 1]) {
            return false;
        }
    }
    return true;
};

function dfsInOrder(root: TreeNode | null): number[] {
    const result = [];
    function traverse(root: TreeNode | null):void {
        if(root === null) {
            return;
        }
        traverse(root.left);
        result.push(root.val);
        traverse(root.right);
    }
    traverse(root);
    return result;
}