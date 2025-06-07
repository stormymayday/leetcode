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
    const result = helper(root);
    function helper(root) {
        if(root === null) {
            return [];
        }
        if(root.left === null && root.right === null) {
            return [[root.val]];
        }

        const allPaths = [];

        const leftPaths = helper(root.left);
        for(const path of leftPaths) {
            path.push(root.val);
            allPaths.push(path);
        }

        const rightPaths = helper(root.right);
        for(const path of rightPaths) {
            path.push(root.val);
            allPaths.push(path);
        }

        return allPaths;
    }
    
    return result.map((arr) => {
        return arr.reverse().join('->');
    });
};