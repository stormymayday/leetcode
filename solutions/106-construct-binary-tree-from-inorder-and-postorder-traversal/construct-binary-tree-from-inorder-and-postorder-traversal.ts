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
    return dfs(inorder, postorder);
};


function dfs(inorder: number[], postorder: number[]): TreeNode | null {

    // Base Case: no more elements in the 'inorder'
    // - Specifically checking 'inorder' length because it will be sliced into two halves
    if (inorder.length === 0) {
        return null;
    }

    // Create root using last element in the 'postorder'
    const rootVal = postorder[postorder.length - 1];
    const root = new TreeNode(rootVal);
    // Find index of the 'rootVal' in the 'inorder'
    const rootIdx = inorder.indexOf(rootVal); // O(n)

    // Recurse Left:
    // - Creating a left subtree
    root.left = dfs(
        // Everything to the left of rootIndex in inorder is the left subtree
        inorder.slice(0, rootIdx),
        // In postorder, left subtree has same length as in inorder
        postorder.slice(0, rootIdx)
    );

    // Recurse Right:
    // - Creating a right subtree
    root.right = dfs(
        // Everything to the right of rootIndex in inorder is the right subtree
        inorder.slice(rootIdx + 1),
        // Starting from 'rootIdx' up until but not including the last element
        postorder.slice(rootIdx, -1)
    );

    // Return root
    return root;

}