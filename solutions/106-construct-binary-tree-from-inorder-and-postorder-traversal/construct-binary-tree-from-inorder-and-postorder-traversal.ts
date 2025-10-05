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
    if(inorder.length === 0) {
        return null;
    }

    // Create root using last element in the 'postorder'
    const rootVal = postorder.pop();
    const root = new TreeNode(rootVal);
    // Find index of the 'rootVal' in the 'inorder'
    const rootIdx = inorder.indexOf(rootVal); // O(n)

    // Recurse Right:
    // - Creating a right subtree
    // - Everything to the right of 'rootIdx' is the right subtree
    root.right = dfs(inorder.slice(rootIdx + 1), postorder);

    // Recurse Left:
    // - Creating a left subtree
    // - Everything to the left of 'rootIdx' is the left subtree
    root.left = dfs(inorder.slice(0, rootIdx), postorder);

    // Return root
    return root;

}