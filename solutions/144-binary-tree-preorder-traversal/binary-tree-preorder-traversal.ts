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

function preorderTraversal(root: TreeNode | null): number[] {

    const res: number[] = [];

    if(root === null) {
        return res;
    }     

    // function helperDFS(root: TreeNode | null): void {
    //     if(root === null) {
    //         return;
    //     }

    //     res.push(root.val);

    //     helperDFS(root.left);
    //     helperDFS(root.right);
    // }

    // helperDFS(root);

    const stack: TreeNode[] = [root];
    while(stack.length > 0) {
        const currNode = stack.pop();
        res.push(currNode.val);
        if(currNode.right) {
            stack.push(currNode.right);
        }
        if(currNode.left) {
            stack.push(currNode.left);
        }
    }

    return res;
};