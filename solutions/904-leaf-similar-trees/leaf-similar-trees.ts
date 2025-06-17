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

function leafList(root: TreeNode | null): number[] {
    const result = [];
    if(root == null) {
        return result;
    }
    const stack = [root];
    while(stack.length > 0) {
        const current = stack.pop();
        if(current.left === null && current.right === null) {
            result.push(current.val);
        }
        if(current.right !== null) {
            stack.push(current.right);
        }
        if(current.left !== null) {
            stack.push(current.left);
        }
    }
    return result;
}