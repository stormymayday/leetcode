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

function bstFromPreorder(preorder: number[]): TreeNode | null {
    
    if(preorder.length === 0) {
        return null;
    }

    const root = new TreeNode(preorder[0]);

    for(let i = 1; i < preorder.length; i += 1) {

        const newNode = new TreeNode(preorder[i]);
        let curr = root;

        while(true) {

            if(curr.val > preorder[i]) {
                if(curr.left !== null) {
                    curr = curr.left;
                } else {
                    curr.left = newNode;
                    break;
                }
            } else {
                if(curr.right !== null) {
                    curr = curr.right;
                } else {
                    curr.right = newNode;
                    break;
                }
            }

        }

    }

    return root;
};