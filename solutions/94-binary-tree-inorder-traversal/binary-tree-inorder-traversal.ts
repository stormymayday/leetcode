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

function inorderTraversal(root: TreeNode | null): number[] {
    
    const res: number[] = [];

    if(root === null) {
        return res;
    }

    let curr: TreeNode | null = root;

    while(curr !== null) {

        if(curr.left === null) {
            res.push(curr.val);
            curr = curr.right;
        } else {
            let predecessor = curr.left;
            while(predecessor.right !== curr && predecessor.right !== null) {
                predecessor = predecessor.right;
            }
            if(predecessor.right === null) {
                predecessor.right = curr;
                curr = curr.left;
            } else {
                predecessor.right = null;
                res.push(curr.val);
                curr = curr.right;
            }
        }

    }

    return res;

};