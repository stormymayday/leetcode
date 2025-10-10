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

function searchBST(root: TreeNode | null, val: number): TreeNode | null {
    
    if(root === null) {
        return root;
    }

    const stack: TreeNode[] = [root];

    while(stack.length > 0) {

        const curr = stack.pop();

        if(curr.val === val) {
            return curr;
        }

        // Smaller - go left
        if(val < curr.val) {
            if(curr.left !== null) {
                stack.push(curr.left);
            }
        }

        // Larger - go right
        if(val > curr.val) {
            if(curr.right !== null) {
                stack.push(curr.right);
            }
        }

    }

    return null;

};