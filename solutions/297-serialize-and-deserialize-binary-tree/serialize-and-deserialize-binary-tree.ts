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

    function helper(root: TreeNode | null): void {
        if(root === null) {
            res.push('null');
            return;
        }
        res.push(String(root.val));
        helper(root.left);
        helper(root.right);
    }

    helper(root);

    return res.join(",");

};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {

    if(data.length === 0) {
        return null;
    }

    const arr: string[] = data.split(",");

    let idx = 0;

    function helper(): TreeNode | null {

        if(arr[idx] === 'null') {
            idx += 1;
            return null;
        }

        const root = new TreeNode(Number(arr[idx]));
        
        idx += 1;

        root.left = helper();
        root.right = helper();

        return root;

    }

    return helper();

};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */