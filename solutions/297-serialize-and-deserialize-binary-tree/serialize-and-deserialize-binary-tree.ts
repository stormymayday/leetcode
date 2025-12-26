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

    function helper(node: TreeNode | null): void {

        if(node === null) {
            res.push("null");
            return;
        }

        res.push(`${node.val}`);
        helper(node.left);
        helper(node.right);

    }

    helper(root);

    return res.join(",");

};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {

    const arr: string[] = data.split(",");
    let idx: number = 0;
    function helper(): TreeNode | null {

        if(idx >= arr.length ||arr[idx] === 'null') {
            idx += 1;
            return null;
        }

        const val = Number(arr[idx]);
        const node = new TreeNode(val);
        idx += 1;
        node.left = helper();
        node.right = helper();

        return node;
    }

    return helper();

};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */