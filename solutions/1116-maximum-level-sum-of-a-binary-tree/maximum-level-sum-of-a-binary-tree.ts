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

function maxLevelSum(root: TreeNode | null): number {

    let maxLevelSum: number = -Infinity;
    let maxLevel: number = 0;

    if(root === null) {
        return maxLevel;
    }

    const sumByLevel = new Map<number, number>();

    const stack: [TreeNode, number][] = [[root, 1]]; // [node, level] in this question root is at level 1

    while(stack.length > 0) {

        const [currNode, level] = stack.pop();

        sumByLevel.set(level, (sumByLevel.get(level) || 0) + currNode.val);

        if(currNode.left !== null) {
            stack.push([currNode.left, level + 1]);
        }

        if(currNode.right !== null) {
            stack.push([currNode.right, level + 1]);
        }
    }

    // We find the level with the true max sum after the DFS collects sums per level.
    // Ensures complete level sums are compared, not partial ones. 
    for(const [level, levelSum] of sumByLevel.entries()) {
        if(levelSum > maxLevelSum) {
            maxLevelSum = levelSum;
            maxLevel = level;
        }
    }

    return maxLevel;
    
};