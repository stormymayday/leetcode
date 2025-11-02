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

function largestBSTSubtree(root: TreeNode | null): number {

    let largestBST: number = 0;

    function helper(root: TreeNode | null): [boolean, number, number, number] {
        // Base Case: In this implementation null counts as a BST of size zero
        if (root === null) {
            return [true, 0, Infinity, -Infinity];
        }

        const [isLeftBST, leftSize, leftMin, leftMax] = helper(root.left);
        const [isRightBST, rightSize, rightMin, rightMax] = helper(root.right);

        if(
            (isLeftBST === true && isRightBST === true) &&
            // BST property: root must be smaller thant the LARGEST value on the left
            // and smaller than the SMALLEST value on the right
            (root.val > leftMax && root.val < rightMin)
        ) {

            const currSize = 1 + leftSize + rightSize;
            // Update the maxSize
            largestBST = Math.max(largestBST, currSize);

            return [true, currSize, Math.min(leftMin, root.val), Math.max(root.val, rightMax)];

        } else {
            // min and max do not matter if we return false
            return [false, 0, -Infinity, Infinity];
        }
    }

    helper(root);

    return largestBST;
};