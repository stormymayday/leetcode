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

    // Base Case: if either of the input arrays is empty
    if(inorder.length === 0) {
        return null;
    }
    
    // Grabbing the last element from the postOrder array
    const value = postorder[postorder.length - 1];
    // Creating a new root using that value
    const root = new TreeNode(value);

    // Grabbing the index of that value from inorder
    const midIndex = inorder.indexOf(value);

    // Split the inorder array into left and right subtrees
    // Left subtree: all elements before the midIndex (non-inclusive)
    const leftInOrder = inorder.slice(0, midIndex);
    // Right subtree: all elements after the midIndex
    const rightInOrder = inorder.slice(midIndex + 1);

    // Split the postOrder array accordingly
    // Left subtree postOrder: first 'leftInOrder.length' elements
    const leftPostOrder = postorder.slice(0, leftInOrder.length);
    // Right subtree postOrder: elements between end of left portion and before the current root value
    const rightPostOrder = postorder.slice(leftInOrder.length, - 1);

    // Recurse left to get the root of the left subtree and assign it as the left child for the current root
    root.left = buildTree(leftInOrder, leftPostOrder);
    // Recurse right to get the root of the right subtree and assign it as the right child for the current root
    root.right = buildTree(rightInOrder, rightPostOrder);

    return root; 
};