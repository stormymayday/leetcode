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

function kthSmallest(root: TreeNode | null, k: number): number {

    if(root === null) {
        return -Infinity;
    }

    // const maxHeap = new MaxHeap();
    const maxHeap: number[] = [];

    const stack: TreeNode[] = [root];

    while(stack.length > 0) {

        const currNode = stack.pop();

        if(maxHeap.length < k) {
            maxHeap.push(currNode.val);
        } else {
            maxHeap.sort((a, b) => a - b);
            if(currNode.val < maxHeap[maxHeap.length - 1]) {
                maxHeap.pop();
                maxHeap.push(currNode.val);
            }
        }

        if(currNode.left !== null) {
            stack.push(currNode.left);
        }

        if(currNode.right !== null) {
            stack.push(currNode.right);
        }

    }

    maxHeap.sort((a, b) => a - b);
    return maxHeap[maxHeap.length - 1];
    
};