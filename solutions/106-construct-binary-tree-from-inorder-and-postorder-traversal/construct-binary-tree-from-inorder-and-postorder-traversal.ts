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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    
    if(inorder.length === 0 || postorder.length === 0) {
        return null;
    }

    const rootVal = postorder[postorder.length - 1];
    const root = new TreeNode(rootVal);
    const rootIdx = inorder.indexOf(rootVal);

    root.left = buildTree(
        inorder.slice(0, rootIdx),
        postorder.slice(0, rootIdx)
    );
    root.right = buildTree(
        inorder.slice(rootIdx + 1),
        postorder.slice(rootIdx, -1)
    );

    return root;
};