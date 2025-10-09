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

    // Edge Case: null root
    if(root === null) {
        return null;
    }

    let potentialSuccessor: TreeNode | null = null;

    while(root !== null) {

        // Important! greater than OR equals to
        if(p.val >= root.val) {
            // dicard the left subtree, move to the right subtree
            root = root.right;
        } else {
            // curr.val > p.val - potential successor found
            if(potentialSuccessor === null) {
                potentialSuccessor = root;
            } else {
                if(root.val < potentialSuccessor.val) {
                    potentialSuccessor = root;
                }
            }
            // Move to the left subtree
            root = root.left;
        }

    }
    
    return potentialSuccessor;
	
};