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

    if(root === null) {
        return "null";
    }

    function helperDFS(root: TreeNode | null): void {
        if(root === null) {
            res.push('null');
            return;
        }
        res.push(String(root.val));
        helperDFS(root.left);
        helperDFS(root.right);
    }

    helperDFS(root);

    return res.join(",");

};

/*
 * Decodes your encoded data to tree.
 */
function deserialize(data: string): TreeNode | null {
    
    if(data.length === 0) {
        return null;
    }

    const queue: string[] = data.split(",").reverse();

    function helperDFS(): TreeNode | null {

        if(queue[queue.length - 1] === 'null') {
            queue.pop();
            return null;
        }

        const root = new TreeNode(Number(queue.pop()));

        root.left = helperDFS();
        root.right = helperDFS();

        return root;

    }

    return helperDFS();

};


/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */