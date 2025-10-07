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
    
    const stack: TreeNode[] = []
    let curr: TreeNode | null = root;
    const res: number[] = [];

    while(curr !== null || stack.length > 0) {

        // Try going left as far as possible (until 'curr' points to null)
        while(curr !== null) {
            stack.push(curr); // push node 'curr' points at to the stack
            curr = curr.left; // go left
        }

        // When 'curr' points to null
        curr = stack.pop(); // 'pop' node from the stack and point 'curr' at it
        res.push(curr.val); // process 'value' at 'curr'
        curr = curr.right; // try switching to the right subtree
        
    }
    
    return res;
    
};