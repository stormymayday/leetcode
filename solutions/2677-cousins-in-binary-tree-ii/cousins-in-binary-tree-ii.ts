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

    const dummyNode = new TreeNode(-Infinity);
    let queue: [TreeNode, TreeNode][] = [[root, dummyNode]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode][] = [];

        // First Pass: get the level sum and prepare next queue
        let levelSum: number = 0;
        for(let i = 0; i < queue.length; i += 1) {
            const [currNode, parent] = queue[i];

            levelSum += currNode.val;
            
            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currNode]);
            }
            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currNode]);
            }

        }

        // Second Pass: modify the tree
        // IMPORTANT: copy node values and with copies, otherwise, forumla does not work because sibling values change on the fly
        const levelValues = queue.map(([node, parent]) => node.val);
        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, parent] = queue[i];

            // Forumula: node.val = levelSum - node.val - siblingVal
            let siblingVal = 0;

            // check for left sibling
            if(i > 0 && queue[i - 1][1] === parent) {
                siblingVal = levelValues[i - 1];
            } 
            // check for right sibling
            else if(i < queue.length - 1 && queue[i + 1][1] === parent) {
                siblingVal = levelValues[i + 1];
            }

            currNode.val = levelSum - currNode.val - siblingVal;

        }
        
        queue = nextQueue;

    }

    return root;
    
};