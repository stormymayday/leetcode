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
    // Edge Case
    if(!root || !p || !q) {
        return null;
    }

    function pathfinder(root: TreeNode, target: TreeNode): TreeNode[] | null {
        // Base Case 1: target not found
        if(root === null) {
            // if target was not found, return 'null'
            return null;
        }

        // Base Case 2: target found
        if(root === target) {
            // if target was found, return array containing node
            return [root];
        }

        // Recurse Left
        const leftPath = pathfinder(root.left, target);
        // Recurse Right
        const rightPath = pathfinder(root.right, target);

        // target was found in the left subtree
        if(leftPath !== null) {
            leftPath.push(root);
            return leftPath;
        } 
        // target was found in the right subtree
        else if(rightPath !== null) {
            rightPath.push(root);
            return rightPath;
        } 
        // target was not found
        else {
            return null;
        }
    }

    const path1: TreeNode[] | null = pathfinder(root, p);
    const path2: TreeNode[] | null = pathfinder(root, q);

    // If target was not found
    if(path1 === null || path2 === null) {
        return null;
    }

    // Creating a set from path1 for O(1) lookup
    const set1 = new Set(path1);
    // for(const node of path1) {
    //     set1.add(node.val);
    // }

    // Iterating over path2
    for(const node of path2) {
        if(set1.has(node)) {
            return node;
        }
    }
	
};