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

function leafSimilar(root1: TreeNode | null, root2: TreeNode | null): boolean {
    
    const list1 = leafList(root1);
    const list2 = leafList(root2);

    if(list1.length !== list2.length) {
        return false;
    }

    for(let i = 0; i < list1.length; i += 1) {
        if(list1[i] !== list2[i]) {
            return false;
        }
    }

    return true;
};

function leafList(root: TreeNode | null):number[] {
    const result = [];
    function dfs(root) {
        if(root === null) {
            return;
        }

        if(root.left === null && root.right === null) {
            result.push(root.val);
        }

        dfs(root.left);
        dfs(root.right);
    }
    dfs(root);
    return result;
}