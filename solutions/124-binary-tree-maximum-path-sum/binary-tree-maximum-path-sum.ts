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

function maxPathSum(root: TreeNode | null): number {
    
    function helper(node: TreeNode | null): [number, number] {
        if(node === null) {
            return [-Infinity, 0]; // [maxPathSum, maxSinglePath]
        }

        const [leftTotalMax, leftPathMax] = helper(node.left);
        const [rightTotalMax, rightPathMax] = helper(node.right);

        // Only consider positive contributions for paths
        const leftPositive = Math.max(0, leftPathMax);
        const rightPositive = Math.max(0, rightPathMax);

        // Max path sum that goes through this node
        const currentTotalMax = node.val + leftPositive + rightPositive;
        
        // Best single path to return to parent
        const currentPathMax = node.val + Math.max(leftPositive, rightPositive);

        // Best total max is either through current node or from subtrees
        const bestTotalMax = Math.max(currentTotalMax, leftTotalMax, rightTotalMax);

        return [bestTotalMax, currentPathMax];
    }

    return helper(root)[0];
}