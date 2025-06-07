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
    if(root === null) {
        return [];
    }

    const result = [];
    const stack = [{node: root, level: 0}];
    while(stack.length > 0) {

        const {node, level} = stack.pop();

        if(result[level] === undefined) {
            result[level] = [];
        }
        result[level].push(node.val);

        if(node.right) {
            stack.push({node: node.right, level: level + 1});
        }

        if(node.left) {
            stack.push({ node: node.left, level: level + 1});
        }
    }
    return result;
};