/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 *     
 *     constructor(v: number) {
 *         this.val = v;
 *         this.children = [];
 *     }
 * }
 */


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

class Codec {
    constructor() {

    }

    // Encodes a tree to a binary tree.
    serialize(root: _Node | null): TreeNode | null {

        // Base Case
        if (root === null) {
            return null;
        }

        // Create new node
        const binaryNode = new TreeNode(root.val);

        // binaryNode.left -> firstChild
        if (root.children.length > 0) {
            const firstChild = root.children[0];
            binaryNode.left = this.serialize(firstChild);
        }

        // firstChild.right -> sibling.right -> sibling.right ...
        let curr = binaryNode.left;
        for (let i = 1; i < root.children.length; i += 1) {
            curr.right = this.serialize(root.children[i]);
            curr = curr.right;
        }

        return binaryNode;

    };

    // Decodes your encoded data to tree.
    deserialize(root: TreeNode | null): _Node | null {

        if (root === null) {
            return null;
        }

        // create N-ary node
        const naryNode = new _Node(root.val);

        // switch to the left subtree
        let curr = root.left;
        while(curr !== null) {
            naryNode.children.push(this.deserialize(curr));
            curr = curr.right; // keep going right;
        }

        return naryNode;

    };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));