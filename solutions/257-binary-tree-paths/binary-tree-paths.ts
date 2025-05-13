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
    if (!root) {
        return [];
    }
    
    const result: string[] = [];
    
    function dfs(node: TreeNode, path: string) {
        // Current path includes the current node value
        const currentPath = path ? `${path}->${node.val}` : `${node.val}`;
        
        // If leaf node, add the path to results
        if (!node.left && !node.right) {
            result.push(currentPath);
            return;
        }
        
        // Process left subtree
        if (node.left) {
            dfs(node.left, currentPath);
        }
        
        // Process right subtree
        if (node.right) {
            dfs(node.right, currentPath);
        }
    }
    
    dfs(root, "");
    return result;
}