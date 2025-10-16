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

class BSTIterator {

    inorder: number[];
    idx: number;

    constructor(root: TreeNode | null) {

        this.inorder = [];
        this.idx = 0;

        if (root !== null) {

            const helperDFS = (node: TreeNode | null): void => {
                if(node === null) {
                    return;
                }
                helperDFS(node.left);
                this.inorder.push(node.val);
                helperDFS(node.right);
            }

            helperDFS(root);

        }

    }

    next(): number {

        if(this.idx < this.inorder.length) {
            let temp: number = this.inorder[this.idx];
            this.idx += 1;
            return temp;
        } else {
            return -Infinity;
        }

    }

    hasNext(): boolean {

        if(this.idx < this.inorder.length) {
            return true;
        } else {
            return false;
        }

    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */