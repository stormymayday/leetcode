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

function sortedArrayToBST(nums: number[]): TreeNode | null {

    function helper(left: number, right: number): TreeNode | null {

        if(left > right) {
            return null;
        }

        const midIdx = Math.floor((right + left) / 2);

        const root = new TreeNode(nums[midIdx]);

        root.left = helper(left, midIdx - 1);
        root.right = helper(midIdx + 1, right);

        return root;

    }

    return helper(0, nums.length - 1);
    
};