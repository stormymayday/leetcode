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

function rob(root: TreeNode | null): number {

    if(root === null) {
        return 0;
    }

    // helper returns a tuple
    // - first is the max value including root / current node
    // - second is the max value excluding root / current node
    function helper(node: TreeNode | null): [number, number] {
        if(node === null) {
            return [0, 0];
        }

        const [leftWithRoot, leftWithoutRoot] = helper(node.left);
        const [rightWithRoot, rightWithoutRoot] = helper(node.right);

        // If we include current node's value, we must exclude it's children root values
        const withRoot = node.val + leftWithoutRoot + rightWithoutRoot;

        // Otherwise, we don't have a restriction and can take max from left and max from right and add them together
        const withoutRoot = Math.max(leftWithRoot, leftWithoutRoot) + Math.max(rightWithRoot, rightWithoutRoot);

        return [withRoot, withoutRoot];
    }

    // const [maxWithRoot, maxWithoutRoot] = helper(root);
    // return maxWithRoot > maxWithoutRoot ? maxWithRoot : maxWithoutRoot;

    return Math.max(...helper(root));
    
};