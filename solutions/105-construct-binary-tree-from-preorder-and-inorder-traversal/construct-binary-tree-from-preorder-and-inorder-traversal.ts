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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
    return dfs(inorder, preorder);
};

function dfs(inorder: number[], preorder: number[]): TreeNode | null {

    // Base Case
    if(inorder.length === 0) {
        return null;
    }

    // Create root using first element of the 'preorder'
    const rootVal = preorder[0];
    const root = new TreeNode(rootVal);
    // Get index of the 'rootVal' in 'inorder'
    const rootIdx = inorder.indexOf(rootVal);
    // Calculate size of the left subtree
    // const leftSubtreeSize = rootIdx; 

    // Construct Left Subtree
    root.left = dfs(
        // everything to the left of 'rootIdx'
        inorder.slice(0, rootIdx),
        // skipping index 1 (root) + size of the left subtree
        preorder.slice(1, rootIdx + 1)
    );

    // Construct Right Subtree
    root.right = dfs(
        // everything to the right of 'rootIdx'
        inorder.slice(rootIdx + 1),
        //
        preorder.slice(rootIdx + 1)

    );

    return root;

}