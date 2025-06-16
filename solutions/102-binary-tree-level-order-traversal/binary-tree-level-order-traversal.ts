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
    const result = [];
    if(root === null) {
        return result;
    }
    const stack = [{node: root, depth: 0}];
    while(stack.length > 0) {
        const {node, depth} = stack.pop();
        if(result[depth] === undefined) {
            result[depth] = [];
        }
        result[depth].push(node.val);
        if(node.right) {
            stack.push({
                node: node.right,
                depth: depth + 1,
            });
        }
        if(node.left) {
            stack.push({
                node: node.left,
                depth: depth + 1,
            });
        }
    }
    return result;
};