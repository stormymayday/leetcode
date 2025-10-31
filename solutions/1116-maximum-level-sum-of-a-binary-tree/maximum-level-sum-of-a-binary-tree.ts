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
    const sumByLevel = new Map<number, number>();

    function dfs(node: TreeNode | null, level: number): void {

        if(node === null) {
            return;
        }

        if(!sumByLevel.has(level)) {
            sumByLevel.set(level, 0);
        }
        sumByLevel.set(level, sumByLevel.get(level) + node.val);

        // Updating max here can cause a problem because DFS goes deep before finishing a level, 
        // Therefore, “partial sums” of deeper levels can temporarily appear greater before the shallower level is done being processed.
        // if(sumByLevel.get(level) > maxLevelSum) {
        //     maxLevelSum = sumByLevel.get(level);
        //     maxLevel = level;
        // }

        dfs(node.left, level + 1);
        dfs(node.right, level + 1);

    }

    dfs(root, 1);

    // The DFS only collects sums per level first.
    // Only after all recursion finishes do we find the level with the true max sum.
    // Ensures complete level sums are compared, not partial ones. 
    for(const [level, levelSum] of sumByLevel.entries()) {
        if(levelSum > maxLevelSum) {
            maxLevelSum = levelSum;
            maxLevel = level;
        }
    }

    return maxLevel;
    
};