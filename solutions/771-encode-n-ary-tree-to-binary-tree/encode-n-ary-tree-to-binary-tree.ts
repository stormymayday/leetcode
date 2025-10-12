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
    // Strategy: 
    serialize(root: _Node | null): TreeNode | null {

        if(root === null) {
            return null;
        }

        // Create a new Binary Tree root using N-ary root's value
        const binaryTreeRoot = new TreeNode(root.val);

        // Queue-up both roots
        let queue: [_Node, TreeNode][] = [[root, binaryTreeRoot]];

        // BFS
        while(queue.length > 0) {

            const nextQueue: [_Node, TreeNode][] = [];

            for(let i = 0; i < queue.length; i += 1) {
                
                const [currNaryNode, currBinaryNode] = queue[i];

                // Process children of the N-ary Node
                const naryNodeChildren = currNaryNode.children;
                if(naryNodeChildren.length > 0) {

                    // Algorithm: 
                    // - First N-ary Child is assigned as the left child for the 'currBinaryNode'
                    // - Remaining Children are linked up via their 'right' pointer like a Linked List

                    // - First Child
                    // Create a new Binary Tree Node using the value
                    const firstBinaryChild = new TreeNode(naryNodeChildren[0].val);
                    // Assign this node as a left child  for 'currBinaryNode'
                    currBinaryNode.left = firstBinaryChild;
                    // Queue-up both nodes
                    nextQueue.push([naryNodeChildren[0], firstBinaryChild]);

                    // - Remaining Children
                    // set up a 'prev' pointer initially pointing at the 'firstBinaryChild'
                    let prev: TreeNode = firstBinaryChild;
                    // Iterate over the remaining children
                    for(let j = 1; j < naryNodeChildren.length; j += 1) {
                        
                        // Create a Binary Tree Node
                        const newBinaryNode = new TreeNode(naryNodeChildren[j].val);
                        // Link nodes using the 'right' pointer
                        prev.right = newBinaryNode;
                        // Queue-up the nodes
                        nextQueue.push([naryNodeChildren[j],newBinaryNode ]);
                        // Move the pointer
                        prev = prev.right;

                    }

                }

            }

            queue = nextQueue;

        }

        return binaryTreeRoot;

    };
	
    // Decodes your encoded data to tree.
    deserialize(root: TreeNode | null): _Node | null {

        if(root === null) {
            return null;
        }

        // Create N-ary Tree root using the value
        const naryRoot = new _Node(root.val);

        // Queue-up both roots
        let queue: [TreeNode, _Node][] = [[root, naryRoot]];

        // Run BFS
        while(queue.length > 0) {

            const nextQueue: [TreeNode, _Node][] = [];

            for(let i = 0; i < queue.length; i += 1) {

                const [currBinaryNode, currNaryNode] = queue[i];

                // Start from the left child of the Binary Node
                let curr = currBinaryNode.left;

                // Traverse all siblings via right pointers
                while(curr !== null) {
                    // Create a new N-ary Node
                    const naryChild = new _Node(curr.val);
                    // Add it as a child
                    currNaryNode.children.push(naryChild);
                    // Queue-up the nodes
                    nextQueue.push([curr, naryChild]);
                    // Move pointer to the right
                    curr = curr.right;
                }

            }

            queue = nextQueue;

        }

        return naryRoot;
        
    };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));