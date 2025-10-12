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

    // Encodes an N-ary tree to a binary tree using BFS
    // Strategy: left child = first child, right child = next sibling
    serialize(root: _Node | null): TreeNode | null {
        if (root === null) {
            return null;
        }

        const bRoot = new TreeNode(root.val);
        let queue: [_Node, TreeNode][] = [[root, bRoot]];

        while (queue.length > 0) {
            
            const nextQueue: [_Node, TreeNode][] = [];

            for (let i = 0; i < queue.length; i++) {

                const [currNode, currTreeNode] = queue[i];
                
                // Process children of current node
                const children = currNode.children;
                
                if (children.length > 0) {
                    // First child goes to left pointer
                    const firstChildTreeNode = new TreeNode(children[0].val);
                    currTreeNode.left = firstChildTreeNode;
                    nextQueue.push([children[0], firstChildTreeNode]);
                    
                    // Remaining children are linked as siblings via right pointers
                    let prev = firstChildTreeNode;
                    for (let j = 1; j < children.length; j++) {
                        const siblingTreeNode = new TreeNode(children[j].val);
                        prev.right = siblingTreeNode;
                        nextQueue.push([children[j], siblingTreeNode]);
                        prev = siblingTreeNode;
                    }
                }
            }

            queue = nextQueue;
        }

        return bRoot;
    }

    // Decodes a binary tree back to an N-ary tree using BFS
    deserialize(root: TreeNode | null): _Node | null {
        if (root === null) {
            return null;
        }

        const naryRoot = new _Node(root.val);
        let queue: [TreeNode, _Node][] = [[root, naryRoot]];

        while (queue.length > 0) {
            const nextQueue: [TreeNode, _Node][] = [];

            for (let i = 0; i < queue.length; i++) {
                const [currTreeNode, currNaryNode] = queue[i];
                
                // Left pointer points to first child
                let current = currTreeNode.left;
                
                // Traverse all siblings via right pointers
                while (current !== null) {
                    const child = new _Node(current.val);
                    currNaryNode.children.push(child);
                    nextQueue.push([current, child]);
                    current = current.right;
                }
            }

            queue = nextQueue;
        }

        return naryRoot;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));