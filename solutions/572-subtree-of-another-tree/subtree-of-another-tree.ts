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

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {

    if(root === null) {
        return false;
    }

    if(subRoot == null) {
        return true;
    }

    // Phase 1: find the 'subRoot' inside the 'root' tree
    const stack: TreeNode[] = [root];
    while(stack.length > 0) {

        const currNode = stack.pop();

        // Phase 2: perform the 'Same Tree' algorithm
        if(currNode.val === subRoot.val) {
            const result = sameTree(currNode, subRoot);
            if(result === true) {
                return true;
            }
        }

        if(currNode.left !== null) {
            stack.push(currNode.left);
        }

        if(currNode.right !== null) {
            stack.push(currNode.right);
        }

    }
    return false; // 'subRoot' is not inside the 'root' tree
};

function sameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    if(p === null && q === null) {
        return true;
    }

    // Due to the base case above, atleast one of the nodes is not null
    if(p === null || q === null) {
        return false;
    } 

    // Due to the base case above, both nodes are not null, value check
    if(p.val !== q.val) {
        return false;
    }

    return sameTree(p.left, q.left) && sameTree(p.right, q.right);
}