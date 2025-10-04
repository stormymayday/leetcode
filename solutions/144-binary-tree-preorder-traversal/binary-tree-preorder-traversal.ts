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

function preorderTraversal(root: TreeNode | null): number[] {
    const path: number[] = [];
    preorderDFS(root, path);
    return path;
};

function preorderRDFS(root: TreeNode | null, path: number[]): void {

    // Base Case: 
    if(root === null) {
        return;
    }
    
    // Visit
    path.push(root.val);

    // Recurse Left
    preorderDFS(root.left, path);

    // Recurse Right
    preorderDFS(root.right, path);

}

function preorderDFS(root: TreeNode | null, path: number[]): void {

    if(root === null) {
        return;
    }

    const stack: TreeNode[] = [];
    stack.push(root);

    while(stack.length > 0) {

        const currNode = stack.pop();
        path.push(currNode.val);

        if(currNode.right !== null) {
            stack.push(currNode.right);
        }

        if(currNode.left !== null) {
            stack.push(currNode.left);
        }

    }

    return;
}