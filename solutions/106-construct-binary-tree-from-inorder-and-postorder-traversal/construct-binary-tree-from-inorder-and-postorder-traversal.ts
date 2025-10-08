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

    const inorderLeft = inorder.slice(0, rootIdx); // from index 0 and up until (not including) 'rootIdx'
    const inorderRight = inorder.slice(rootIdx + 1); // from rootIdx + 1 until the end
    const postorderLeft = postorder.slice(0, 
    inorderLeft.length); // from index 0 + length of 'inorderLeft' (exclusive)
    const postorderRight = postorder.slice(inorderLeft.length, -1); // from length of 'inorderLeft' up until -1 from the end

    root.left = buildTree(
        inorderLeft,
        postorderLeft
    );
    root.right = buildTree(
        inorderRight,
        postorderRight
    );

    return root;
};