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


    function helperDFS(leftIdx: number, rightIdx: number): TreeNode | null {

        if(leftIdx > rightIdx) {
            return null;
        }

        const midIdx = Math.floor((leftIdx + rightIdx) / 2);

        const root = new TreeNode(nums[midIdx]);

        root.left = helperDFS(leftIdx, midIdx -1);

        root.right = helperDFS(midIdx + 1, rightIdx);

        return root;

    }

    return helperDFS(0, nums.length - 1);
    
};