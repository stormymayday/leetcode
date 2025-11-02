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

    // Edge Case: must check for null if 'largestBST' starts from 1
    if(root === null) {
        return 0
    }

    // Can set to zero but then must run update on each leaf
    let largestBST: number = 1;

    function helper(root: TreeNode | null): [boolean, number, number, number] {
        // Base Case: In this implementation null doesn't count as a BST
        if (root === null) {
            return [false, 0, -Infinity, Infinity];
        }

        // Base Case: leaf node counts as a BST
        if (root.left === null && root.right === null) {
            // Since we set 'largestBST' to be 0
            // Either update max at each leaf or set 'largestBST' to 1 initially
            // largestBST = Math.max(largestBST, 1);
            return [true, 1, root.val, root.val];
        }

        const [isLeftBST, leftSize, leftMin, leftMax] = helper(root.left);
        const [isRightBST, rightSize, rightMin, rightMax] = helper(root.right);

        // Both left and right subtrees are BSTs
        if (
            (isLeftBST === true && isRightBST === true) &&
            (root.val > leftMax && root.val < rightMin)
            ) {
            
            const currSize = 1 + leftSize + rightSize;
            largestBST = Math.max(largestBST, currSize);
            return [true, currSize, leftMin, rightMax];
        }
        // Left is a BST and right is null
        else if (
            (isLeftBST === true && root.right === null) &&
            (root.val > leftMax)
        ) {

            const currSize = 1 + leftSize + rightSize;
            largestBST = Math.max(largestBST, currSize);
            return [true, 1 + leftSize, leftMin, root.val];
        }
        // Right is a BST and left is null
        else if (
            (isRightBST === true && root.left === null) &&
            (root.val < rightMin)
            ) {
            
            const currSize = 1 + leftSize + rightSize;
            largestBST = Math.max(largestBST, currSize);
            return [true, 1 + rightSize, root.val, rightMax];
        }
        // Otherwise, we can't count current as a BST
        else {
            return [false, 0, -Infinity, Infinity];
        }
    }

    helper(root);

    return largestBST;
};