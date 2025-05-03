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
function helper(root) {
    // Base Case 1: null
    if(root === null) {
        return [];
    }
    // Base Case 2: leaf node
    if(root.left === null && root.right === null) {
        return [[root.val]];
    }

    const allPaths = [];

    // Recurse Left
    const leftSubPaths = helper(root.left);
    for(const path of leftSubPaths) {
        // adding root to the current sub path
        path.push(root.val);
        // adding current sub path to all paths
        allPaths.push(path);
    }

    // Recurse Right
    const rightSubPaths = helper(root.right);
    for(const path of rightSubPaths) {
        // adding root to the current sub path
        path.push(root.val);
        // adding current sub path to all paths
        allPaths.push(path);
    }

    return allPaths;
}
function binaryTreePaths(root: TreeNode | null): string[] {

    const paths = helper(root);
    
    // for(let path of paths) {
    //     Issue: only changes the local variable path, not the array element itself.
    //     path = path.reverse().join("->");
    // }
    
    return paths.map(path => {
        return path.reverse().join("->");
    });
};