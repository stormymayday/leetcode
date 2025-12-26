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

function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {

    const res: TreeNode[] = [];
    const serializedSubtrees = new Set<string>();
    const usedKeys = new Set<string>(); // to prevent adding similar nodes more than once

    function postorderDFS(node: TreeNode | null): void {

        if(node === null) {
            return;
        }

        postorderDFS(node.left);
        postorderDFS(node.right);

        const key = serialize(node);

        // Seeing this key for the first time
        if(!serializedSubtrees.has(key)) {
            serializedSubtrees.add(key);
        } 
        // Seen this key before - duplicate node
        else {
            if(!usedKeys.has(key)) {
                usedKeys.add(key);
                res.push(node); // adding duplicate node to the result only once
            }
        }

    }
    postorderDFS(root);

    return res;
    
};

function serialize(root: TreeNode | null): string {

    const res: string[] = [];

    function helper(node: TreeNode | null): void {

        if(node === null) {
            res.push('null');
            return;
        }

        res.push(`${node.val}`);
        helper(node.left);
        helper(node.right);

    }

    helper(root);

    return res.join(",");
}