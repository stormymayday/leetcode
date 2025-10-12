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
        
        if(root === null) {
            return null;
        }

        const binaryRoot = new TreeNode(root.val);
        let queue: [_Node, TreeNode][] = [[root, binaryRoot]];

        while(queue.length > 0) {

            const nextQueue: [_Node, TreeNode][] = [];

            for(let i = 0; i < queue.length; i += 1) {

                const [currNaryNode, currBinaryNode] = queue[i];

                const naryChildren = currNaryNode.children;

                if(naryChildren.length > 0) {
                    
                    // currBinaryNode.left -> firstChild
                    const firstChild = new TreeNode(naryChildren[0].val);
                    currBinaryNode.left = firstChild;
                    nextQueue.push([naryChildren[0], firstChild]);

                    // firstChild.right -> sibling.right -> sibling.right ...
                    let prev = firstChild;
                    for(let j = 1; j < naryChildren.length; j += 1) {

                        const newBinaryNode = new TreeNode(naryChildren[j].val);
                        nextQueue.push([naryChildren[j], newBinaryNode]);
                        prev.right = newBinaryNode;
                        prev = prev.right;

                    }

                }

            }

            queue = nextQueue;

        }

        return binaryRoot;

    };
	
    // Decodes your encoded data to tree.
    deserialize(root: TreeNode | null): _Node | null {

        if(root === null) {
            return null;
        }

        const naryRoot = new _Node(root.val);
        let queue: [TreeNode, _Node][] = [[root, naryRoot]];

        while(queue.length > 0) {

            const nextQueue: [TreeNode, _Node][] = [];

            for(let i = 0; i < queue.length; i += 1) {
                
                const [currBinaryNode, currNaryNode] = queue[i];

                // first child is on the currBinaryNode.left
                let curr = currBinaryNode.left;

                // Siblings are on the firstChild.right
                while(curr !== null) {

                    const newNaryNode = new _Node(curr.val);
                    currNaryNode.children.push(newNaryNode);
                    nextQueue.push([curr, newNaryNode]);
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