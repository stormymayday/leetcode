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

function isValidBST(root: TreeNode | null): boolean {

    const result: number[] = [];

    // Fill in the array using In Order Traversal
    inOrderTraversal(root, result);

    // Check if array is sorted or not
    return isSorted(result);
    
};

function inOrderTraversal(root: TreeNode | null, arr: number[]):void {
    // Base Case
    if(root === null) {
        return;
    }

    // 1. Recurse Left
    inOrderTraversal(root.left, arr);

    // 2. Visit Node
    arr.push(root.val);

    // 3. Recurse Right
    inOrderTraversal(root.right, arr);

}

function isSorted(arr: number[]):boolean {
    // If array is empty or has only 1 element
    if(arr.length < 2) {
        // consider it sorted
        return true;
    }

    // Starting from index 1
    for(let i = 1; i < arr.length; i++) {
        if(arr[i] <= arr[i - 1]) {
            // False if greater or equal
            return false;
        }
    }

    return true;
}