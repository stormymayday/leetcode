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

function maxProduct(root: TreeNode | null): number {

    let totalSum = 0;

    function preorder(node: TreeNode | null): number {
        if(node === null) {
            return 0;
        }

        return node.val + preorder(node.left) + preorder(node.right);
    }

    totalSum = preorder(root);

    let maxProduct = 0;

    function postorder(node: TreeNode | null): number {

        if(node === null) {
            return 0;
        }

        const leftSum = postorder(node.left);
        const rightSum =  postorder(node.right);
        const currSum = node.val + leftSum + rightSum;

        maxProduct = Math.max(maxProduct, (totalSum - currSum) * currSum);

        return currSum;
    }

    postorder(root);

    return maxProduct % (1e9 + 7);
    
};