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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {

    // Edge Case: either root, p or q is null
    if(!root || !p || !q) {
        return null;
    }

    // Find paths to both values
    const path1 = findPath(root, p.val);
    const path2 = findPath(root, q.val);

    // Edge Case: either of the paths is null
    if(path1 === null || path2 === null) {
        return null;
    }

     // Adding first path into a set for faster lookup
    const set = new Set(path1);

    // Iterating over the second path
    for(const node of path2) {
        // Find the first node in pathToVal2 that exists in pathToVal1
        if(set.has(node)) {
        return node;
        }
    }
	
};

function findPath(root, target) {

    // Base Case 1: reached null
    if(root === null) {
        return null;
    }

    // Base Case 2: reached target
    if(root.val === target) {
        return [root];
    }

    // Traverse Left
    const leftPath = findPath(root.left, target);
    if(leftPath !== null) {
        leftPath.push(root);
        return leftPath;
    }

    // Traverse Right
    const rightPath = findPath(root.right, target);
    if(rightPath !== null) {
        rightPath.push(root);
        return rightPath;
    }

    return null;

}