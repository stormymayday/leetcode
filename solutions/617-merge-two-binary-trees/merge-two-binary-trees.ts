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

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {

    if(!root1 && !root2) {
        return null;
    }

    const root = new TreeNode();
    if(root1 !== null && root2 !== null) {
        root.val = root1.val + root2.val;
    } else if(!root1) {
        root.val = root2.val;
    } else {
        root.val = root1.val;
    }

    root.left = mergeTrees(root1?.left || null, root2?.left || null);
    root.right = mergeTrees(root1?.right || null, root2?.right || null);

    return root;
    
};