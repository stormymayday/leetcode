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

    function preorderDFS(root: TreeNode | null): void {
        if(root === null) {
            res.push('null');
            return;
        }

        res.push(String(root.val));

        preorderDFS(root.left);
        preorderDFS(root.right);

    }

    preorderDFS(root);

    return res.join(",");

};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {

    const arr: string[] = data.split(",");
    let idx = 0;

    function preorderDFS(): TreeNode | null {

        if(arr[idx] === 'null') {
            idx += 1;
            return null;
        }

        const root = new TreeNode(Number(arr[idx]));
        idx += 1;

        root.left = preorderDFS();
        root.right = preorderDFS();

        return root;

    }

    return preorderDFS();

};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */