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

function isValidBST(root: TreeNode | null): boolean {

    let prev: number | null = null;
    // const stack: (TreeNode | null)[] = [];
    const stack: TreeNode[] = [];

    while(stack.length > 0 || root !== null) {

        // Go left as deep as possible
        while(root !== null) {
            stack.push(root);
            root = root.left;
        }

        // now root should be 'null'
        // pop from the stack and re-assign root
        root = stack.pop();
        // check root val
        if(prev !== null && root.val <= prev) {
            return false;
        }
        prev = root.val;

        // switch to the right subree
        root = root.right;
    }

    return true;
};