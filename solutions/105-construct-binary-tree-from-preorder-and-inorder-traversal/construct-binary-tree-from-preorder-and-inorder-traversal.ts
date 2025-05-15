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

    // creating a map for faster index lookup
    const inorderIndexMap = new Map();
    for(let i = 0; i < inorder.length; i++) {
        inorderIndexMap.set(inorder[i], i);
    }
    
    function helper(
        inorder,
        preorder,
        inorderIndexMap,
        inorderStart = 0,
        inorderEnd = inorder.length - 1,
        preorderStart = 0,
        preorderEnd = preorder.length - 1
    ) {
        // Base Base: start and end indexes have crossed
        if(inorderStart > inorderEnd) {
            return null;
        }

        const value = preorder[preorderStart]; // get the root value
        const root = new TreeNode(value); // create new root with that value
        const mid = inorderIndexMap.get(value); // fetch corresponding index from inorder array
        const leftSize = mid - inorderStart; // number of elements passed to the left subtree

        root.left = helper(
            inorder,
            preorder,
            inorderIndexMap,
            inorderStart, // inorderStart stays the same
            mid - 1, // inorderEnd stops 1 shy of mid
            preorderStart + 1, // preorderStart increments by 1 to skip the root
            preorderStart + leftSize // preorderEnd 
        );

        root.right = helper(
            inorder,
            preorder,
            inorderIndexMap,
            mid + 1, // inorderStart is now 1 past the mid
            inorderEnd, // inorderEnd stays the same
            preorderStart + leftSize + 1, // 'right' preorderStart moves 1 spot after the 'left' side
            preorderEnd // preorderEnd stays the same
        );

        return root;
    }
    return helper(inorder, preorder, inorderIndexMap);

};