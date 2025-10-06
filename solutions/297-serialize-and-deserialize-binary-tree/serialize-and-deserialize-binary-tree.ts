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

/*
 * Encodes a tree to a single string.
 */
function serialize(root: TreeNode | null): string {

    const res: string[] = [];

    function dfs(root) {

        // Base Case: null node
        if(root === null) {
            res.push('null');
            return;
        }

        res.push(root.val);

        dfs(root.left);

        dfs(root.right);

    }

    dfs(root);

    return res.join(",");

};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {

    const arr: string[] = data.split(",");

    let idx = 0;

    function dfs() {
        // Base Case: null
        if(arr[idx] === 'null') {
            idx += 1;
            return null;
        }

        const root = new TreeNode();
        root.val = Number(arr[idx]);
        idx += 1;

        root.left = dfs();
        root.right = dfs();

        return root;
    }

    return dfs();
};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */