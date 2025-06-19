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
    // Create a value to index mapping for inorder to find root index in O(1) time
    const inOrderIndex = {};
    for(let i = 0; i < inorder.length; i += 1) {
        const value = inorder[i];
        inOrderIndex[value] = i;
    }

    function helper(
        inorder,
        preorder,
        inOrderIndex,
        inOrderStart = 0,
        inOrderEnd = inorder.length - 1,
        preOrderStart = 0,
        preOrderEnd = preorder.length - 1
    ) {

        // Base Case: indicies have crossed (can use either inorder, postorder, or both)
        if(inOrderStart > inOrderEnd) {
            return null;
        }

        // first element of the preorder is the current root
        const rootVal = preorder[preOrderStart];
        const root = new TreeNode(rootVal);

        // using hashMap to get the root index from inorder
        const mid = inOrderIndex[rootVal];

        // Recursive Step
        root.left = helper(
            inorder,
            preorder,
            inOrderIndex,
            inOrderStart, // stays the same
            mid - 1, // inOrderEnd (right before mid)
            preOrderStart + 1, // preOrderStart (original plus one)
            preOrderStart + (mid - inOrderStart) // preOrderEnd (preOrderStart start plus the length of the inorder 'left')
        );

        root.right = helper(
            inorder,
            preorder,
            inOrderIndex,
            mid + 1, // inOrderStart (right after mid)
            inOrderEnd, // stays the same
            preOrderStart + (mid - inOrderStart) + 1, // same left side but plus 1
            preOrderEnd // stays the same
        );

        return root;
    }

    return helper(inorder, preorder, inOrderIndex);

};