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

        if (root === null) {
            return null;
        }

        const bRoot = new TreeNode(root.val);

        let queue: [_Node, TreeNode][] = [[root, bRoot]];

        while (queue.length > 0) {

            const nextQueue: [_Node, TreeNode][] = [];

            for (let i = 0; i < queue.length; i += 1) {

                const [currNode, currBNode] = queue[i];

                const children = currNode.children;
                if (children.length > 0) {

                    const firstBinaryChild = new TreeNode(children[0].val);
                    currBNode.left = firstBinaryChild;
                    nextQueue.push([children[0], firstBinaryChild]);

                    let temp: TreeNode | null = firstBinaryChild;
                    for(let j = 1; j < children.length; j += 1) {

                        const binaryChild = new TreeNode(children[j].val);
                        
                        temp.right = binaryChild;
                        temp = temp.right;

                        nextQueue.push([children[j], binaryChild]);

                    }

                }

            }

            queue = nextQueue;

        }

        return bRoot;

    };

    // Decodes your encoded data to tree.
    deserialize(root: TreeNode | null): _Node | null {

        if (root === null) {
            return null;
        }

        const nRoot = new _Node(root.val);

        let queue: [TreeNode, _Node][] = [[root, nRoot]];

        while (queue.length > 0) {

            const nextQueue: [TreeNode, _Node][] = [];

            for (let i = 0; i < queue.length; i += 1) {

                const [bNode, nNode] = queue[i];

                // left is a first child
                let curr = bNode.left;

                while (curr !== null) {

                    const naryChild = new _Node(curr.val);

                    nNode.children.push(naryChild);

                    nextQueue.push([curr, naryChild]);

                    curr = curr.right;

                }

            }

            queue = nextQueue;

        }

        return nRoot;

    };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));