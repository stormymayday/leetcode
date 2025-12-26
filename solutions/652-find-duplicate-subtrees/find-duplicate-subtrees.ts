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
    const serializedSubtrees = new Map<string, TreeNode[]>();

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
            serializedSubtrees.set(key, []);
        }
        const subtrees: TreeNode[] = serializedSubtrees.get(key);
        // Slight memory optimization (storing up to 3 duplicates)
        if(subtrees.length <= 2) {
            subtrees.push(node);
        }
        
        // Second time seeing this node (won't add 'extra' duplicates)
        if(subtrees.length === 2) {
            res.push(node);
        }

        return key;

    }
    postorderDFS(root);

    return res;
    
};