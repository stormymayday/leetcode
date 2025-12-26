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

    function postorderDFS(node: TreeNode | null): void {

        if(node === null) {
            return;
        }

        postorderDFS(node.left);
        postorderDFS(node.right);

        const key = serialize(node);
        if(!serializedSubtrees.has(key)) {
            serializedSubtrees.set(key, []);
        }
        serializedSubtrees.get(key).push(node);

    }
    postorderDFS(root);

    for(const val of serializedSubtrees.values()) {
        // Intuition: if array 'val' contains more than 1 element, those should be duplicates
        if(val.length > 1) {
            res.push(val[0]); // grab first
        }
    }

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