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
    if(inorder.length === 0) {
        return null;
    }
    
    // last element of postorder is the curret root
    const rootVal = postorder[postorder.length - 1];
    const root = new TreeNode(rootVal);

    // getting the middle of inorder
    const mid = inorder.indexOf(rootVal);

    // building left and right inorder arrays
    const leftInOrder = inorder.slice(0, mid);
    const rightInOrder = inorder.slice(mid + 1);

    // building left and right postorder arrays
    const leftPostOrder = postorder.slice(0, leftInOrder.length);
    const rightPostOrder = postorder.slice(leftInOrder.length, - 1);

    // Recursive Step
    root.left = buildTree(leftInOrder, leftPostOrder);
    root.right = buildTree(rightInOrder, rightPostOrder);

    return root;
};