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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {
    
    if(root === null) {
        return false;
    }

    let foundOne: boolean = false;
    let depthOne: number = -Infinity;
    let parentOne: TreeNode | null = null;

    function preorderDFS(node: TreeNode | null, depth: number, parent: TreeNode | null): boolean {

        if(node === null) {
            return false;
        }

        // Branch Pruning Optimization: Don't go beyond the depth restricted by the first node found\
        if(foundOne === true && depth > depthOne) {
            return false;
        }

        if(node.val === x || node.val === y) {
            if(foundOne === true) {
                return depth === depthOne && parent !== parentOne;
            } else {

                foundOne = true;
                depthOne = depth;
                parentOne = parent;

            }
        }

        const leftSubtree = preorderDFS(node.left, depth + 1, node);
        if(leftSubtree === true) {
            return true;
        }

        const rightSubtree = preorderDFS(node.right, depth + 1, node);
        if(rightSubtree === true) {
            return true;
        }

        return false;

    }

    return preorderDFS(root, 0, null);

};