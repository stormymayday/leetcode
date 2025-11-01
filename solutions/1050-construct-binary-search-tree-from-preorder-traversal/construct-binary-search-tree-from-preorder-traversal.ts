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

    if(preorder.length == 0) {
        return null;
    }

    const root = new TreeNode(preorder[0]);
    const stack: TreeNode[] = [root];
    for(let i = 1; i < preorder.length; i += 1) {

        const newNode = new TreeNode(preorder[i]);

        if(stack[stack.length - 1].val > newNode.val) {
            stack[stack.length - 1].left = newNode;
            stack.push(newNode);
        } else {
            let temp: TreeNode | null = null;
            while(stack.length > 0 && stack[stack.length - 1].val < newNode.val) {
                temp = stack.pop();
            }
            temp.right = newNode;
            stack.push(newNode);
        }

    }
    return root;
    
};