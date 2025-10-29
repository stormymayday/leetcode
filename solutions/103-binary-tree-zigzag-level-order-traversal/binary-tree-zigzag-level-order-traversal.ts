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

function zigzagLevelOrder(root: TreeNode | null): number[][] {
    
    const res: number[][] = [];

    if(root === null) {
        return res;
    }

    const stack: [TreeNode, number][] = [[root, 0]];

    while(stack.length > 0) {

        const [currNode, level] = stack.pop();

        if(res.length === level) {
            res.push([currNode.val]);
        } else {
            res[level].push(currNode.val);
        }

        if(currNode.right !== null) {
            stack.push([currNode.right, level + 1]);
        }

        if(currNode.left !== null) {
            stack.push([currNode.left, level + 1]);
        }

    }

    for(let i = 0; i < res.length; i += 1) {
        if(i % 2 !== 0) {
            res[i].reverse();
        }
    }
    return res;

};