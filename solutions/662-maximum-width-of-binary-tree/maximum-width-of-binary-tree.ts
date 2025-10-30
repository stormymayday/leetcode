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

function widthOfBinaryTree(root: TreeNode | null): number {

    let maxWidth: number = 0;

    if(root === null) {
        return maxWidth;
    }

    const firstNodeIndexByLevel = new Map<number, number>();

    const stack: [TreeNode, number, number][] = [[root, 0, 0]]; // [node, level, nodeIndex]

    while(stack.length > 0) {

        const [node, level, nodeIndex] = stack.pop();

        if(!firstNodeIndexByLevel.has(level)) {
            firstNodeIndexByLevel.set(level, nodeIndex);
        }

        maxWidth = Math.max(maxWidth, nodeIndex - firstNodeIndexByLevel.get(level) + 1);

        // Number Overflow prevention
        const normalizedIndex = nodeIndex - firstNodeIndexByLevel.get(level);
        
        // Important! Right is pushed first
        if(node.right !== null) {
            stack.push([node.right, level + 1, normalizedIndex * 2 + 1]);
        }

        if(node.left !== null) {
            stack.push([node.left, level + 1, normalizedIndex * 2]);
        }

    }

    return maxWidth;
    
};