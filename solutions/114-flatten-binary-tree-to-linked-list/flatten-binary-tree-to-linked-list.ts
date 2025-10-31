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

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {

    if(root === null) {
        return null;
    }

    const nodes: TreeNode[] = [];

    const stack: TreeNode[] = [root];
    while(stack.length > 0) {

        const currNode = stack.pop();

        if(currNode.right !== null) {
            stack.push(currNode.right);
        }

        if(currNode.left !== null) {
            stack.push(currNode.left);
        }

        currNode.left = null;
        currNode.right = null;
        nodes.push(currNode);

    }

    for(let i = 0; i < nodes.length - 1; i += 1) {
        nodes[i].right = nodes[i + 1];
    }

    // return nodes[0];
    
};