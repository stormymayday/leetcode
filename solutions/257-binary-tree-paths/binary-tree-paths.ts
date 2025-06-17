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
    if(!root) return [];
    const result: number[][] = [];
    const currentPath: number[] = [];
    
    function helper(node: TreeNode): void {
        // Add current node to path - O(1)
        currentPath.push(node.val);
        
        // If leaf node, save copy of current path
        if(node.left === null && node.right === null) {
            result.push([...currentPath]); // O(P) copy only at leaves
        } else {
            // Recurse on children
            if(node.left) {
                helper(node.left);
            }
            if(node.right) {
                helper(node.right);
            }
        }
        
        // Backtrack - remove current node - O(1)
        currentPath.pop();
    }
    
    helper(root);
    
    // Convert number arrays to strings at the end - O(L × P)
    return result.map(path => path.join('->'));
};