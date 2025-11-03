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

    const res: string[] = [];

    function helper(node: TreeNode | null, path: number[]): void {

        if(node === null) {
            return;
        }

        path.push(node.val);

        if(node.left === null && node.right === null) {
            res.push(path.join("->"));
            path.pop();
            return;
        }

        helper(node.left, path);
        helper(node.right, path);

        path.pop();

    }
    helper(root, []);
    return res;
};