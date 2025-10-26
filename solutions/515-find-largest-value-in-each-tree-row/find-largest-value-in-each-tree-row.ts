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

function largestValues(root: TreeNode | null): number[] {

    const res: number[] = [];

    if(root === null) {
        return res;
    }

    const stack: [TreeNode, number][] = [[root, 0]];
    while(stack.length > 0) {
        const [currNode, currLevel] = stack.pop();
        
        if(res.length === currLevel) {
            res.push(currNode.val);
        } else {
            res[currLevel] = Math.max(res[currLevel], currNode.val);
        }

        if(currNode.left !== null) {
            stack.push([currNode.left, currLevel + 1]);
        }
        if(currNode.right !== null) {
            stack.push([currNode.right, currLevel + 1]);
        }
    }

    return res;
    
};