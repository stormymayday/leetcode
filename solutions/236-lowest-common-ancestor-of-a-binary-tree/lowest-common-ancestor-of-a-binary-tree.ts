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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {

    if(root === null || p === null || q === null) {
        return null;
    }

    const pathToP: TreeNode[] = [];
    const pathToQ: TreeNode[] = [];
    
    getPath(root, p, pathToP);
    getPath(root, q, pathToQ);

    // check if either paths are empty (not found)
    // Note: will not happen
    if(pathToP.length === 0 || pathToQ.length === 0) {
        return null;
    }

    for(let i = 0; i < Math.max(pathToP.length, pathToQ.length); i += 1) {

        if(pathToP[i + 1] !== pathToQ[i + 1]) {
            return pathToP[i];
        }

    }
	
};

function getPath(root: TreeNode | null, target: TreeNode | null, path: TreeNode[]): boolean {

    // Base Case 1: null node
    if(root === null) {
        return false;
    }

    // push current node to the 'path'
    path.push(root);

    // Base Case 2: reached the target
    if(root === target) {
        return true;
    }

    // try going left
    const left: boolean = getPath(root.left, target, path);
    if(left === true) {
        // if left returns true, exit early
        return true;
    }

    // try going right
    const right: boolean = getPath(root.right, target, path);
    if(right === true) {
        // if right returns true, exit early
        return true;
    }
    
    // Backtrack only once if both subtrees fail
    path.pop();
    return false;

}