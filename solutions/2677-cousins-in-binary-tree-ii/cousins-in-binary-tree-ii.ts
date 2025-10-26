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

function replaceValueInTree(root: TreeNode | null): TreeNode | null {

    if(root === null) {
        return null;
    }

    let queue: [TreeNode, TreeNode | null][] = [[root, null]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode | null][] = [];

        // First Pass: get the levelSum & prepare nextQueue
        let levelSum: number = 0;
        for(let i = 0; i < queue.length; i += 1) {
            const [currNode, parentNode] = queue[i];
            levelSum += currNode.val;
            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currNode]);
            }
            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currNode]);
            }
        }

        // Second pass: update the values
        // Forumla: value = levelSum - (currNode.val - siblingVal (if exists))
        // Copying node values into a separate array (sibling values)
        const levelValues = queue.map(([node]) => node.val);
        for(let i = 0; i < queue.length; i += 1) {
            const [currNode, parentNode] = queue[i];

            let siblingVal: number = 0;

            // check if node has a left sibling
            if(i > 0 && queue[i - 1][1] === parentNode) {
                siblingVal = levelValues[i - 1];
            } 
            // check if node has a right sibling
            else if(i < queue.length - 1 && queue[i + 1][1] === parentNode) {
                siblingVal = levelValues[i + 1];
            } 
            
            currNode.val = levelSum - currNode.val - siblingVal;
        }

        queue = nextQueue;

    }

    return root;
    
};