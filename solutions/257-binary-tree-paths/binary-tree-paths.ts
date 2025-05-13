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

function binaryTreePaths(root: TreeNode | null): string[] {

    // Edge Case: empty tree
    if(!root) {
        return [];
    }

    const result: string[] = [];

    function helper(root: TreeNode, path: string):void {

        // Handle current path
        // if path exists: append current value
        // otherwise: start with current value
        const currentPath = path ? `${path}->${root.val}` : `${root.val}`;

        // Base Case: leaf node
        if(root.left === null && root.right === null) {
            // current path is finished
            // push it to the result
            result.push(currentPath);
            return;
        }

        // Recurse Left
        if(root.left) {
            helper(root.left, currentPath);
        }

        // Recurse Right
        if(root.right) {
            helper(root.right, currentPath);
        }

    }

    // kick off the recursion
    helper(root, "");

    return result;
    
};