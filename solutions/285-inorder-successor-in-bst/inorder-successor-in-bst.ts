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

function inorderSuccessor(root: TreeNode | null, p: TreeNode | null): TreeNode | null {

    if (root === null || p === null) {
        return null;
    }

    const inorder: TreeNode[] = [];
    function helperDFS(node: TreeNode | null): void {
        if (node === null) {
            return;
        }
        helperDFS(node.left);
        inorder.push(node);
        helperDFS(node.right);
    }
    helperDFS(root);

    for (let i = 0; i < inorder.length - 1; i += 1) {

        // const nextNode = inorder[i + 1];
        // if(nextNode.val > p.val) {
        //     return nextNode;
        // }

        if (inorder[i] === p) {
            return inorder[i + 1];
        }

    }

    return null;

};