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

function isCousins(root: TreeNode | null, x: number, y: number): boolean {

    if(root === null) {
        return false;
    }

    let queue: [TreeNode, TreeNode | null][] = [[root, null]];

    while(queue.length > 0) {

        const nextQueue: [TreeNode, TreeNode][] = [];
        let foundOne: boolean = false;
        let parentOne: TreeNode | null = null;

        for(let i = 0; i < queue.length; i += 1) {

            const [currNode, parentNode] = queue[i];

            // Main Logic: Check if current value equals either x or y
            if(currNode.val === x || currNode.val === y) {
                // Already found one
                if(foundOne === true) {
                    // Check if parents are not the same
                    return parentOne !== parentNode;
                } 
                // Otherwise, found first
                else {
                    foundOne = true;
                    parentOne = parentNode;
                }
            }

            if(currNode.left !== null) {
                nextQueue.push([currNode.left, currNode]);
            }
            if(currNode.right !== null) {
                nextQueue.push([currNode.right, currNode]);
            }


        }

        // Only found one on this level
        if(foundOne === true) {
            return false; // nodes must be on the different levels
        }
        
        queue = nextQueue;

    }
    
    return false;
};