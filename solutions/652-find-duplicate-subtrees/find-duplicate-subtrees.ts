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
    const seenKeys = new Set<string>(); // to prevent adding similar nodes more than once

    // can be any order: pre, in, or post
    function postorderDFS(node: TreeNode | null): string {

        if(node === null) {
            return 'null';
        }

        const postorderNodes: string[] = [];
        postorderNodes.push(postorderDFS(node.left));
        postorderNodes.push(postorderDFS(node.right));
        postorderNodes.push(`${node.val}`);

        const key: string = postorderNodes.join(",");

        // Seeing this key for the first time
        if(!serializedSubtrees.has(key)) {
            serializedSubtrees.add(key);
        } 
        // Seen this key before - duplicate node
        else {
            // Seeing key for the first time
            if(!seenKeys.has(key)) {
                seenKeys.add(key);
                res.push(node); // adding duplicate node to the result only once
            }
        }

        return key;

    }
    postorderDFS(root);

    return res;
    
};