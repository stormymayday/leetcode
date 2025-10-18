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

        const bRoot = new TreeNode(root.val);

        let queue: [_Node, TreeNode][] = [[root, bRoot]];

        while(queue.length > 0) {

            const nextQueue: [_Node, TreeNode][] = [];

            for(let i = 0; i < queue.length; i += 1) {

                const [naryNode, binaryNode] = queue[i];

                const naryChildren = naryNode.children;
                if(naryChildren.length > 0) {
                    
                    // First binary child is connected to it's parent via the 'left' pointer
                    const firstNaryChild = naryChildren[0];
                    const firstBinaryChild = new TreeNode(firstNaryChild.val);
                    binaryNode.left = firstBinaryChild;
                    nextQueue.push([firstNaryChild, firstBinaryChild]);

                    // Rest of the children are connect to each other via the 'right' pointer
                    let curr: TreeNode | null = firstBinaryChild;
                    for(let j = 1; j < naryChildren.length; j += 1) {

                        const nextNaryChild = naryChildren[j];
                        const nextBinaryChild = new TreeNode(nextNaryChild.val);
                        curr.right = nextBinaryChild;
                        curr = curr.right;
                        nextQueue.push([nextNaryChild, nextBinaryChild]);

                    }

                }

            }

            queue = nextQueue;

        }

        return bRoot;
        
    };
	
    // Decodes your encoded data to tree.
    deserialize(root: TreeNode | null): _Node | null {

        if(root === null) {
            return null;
        }

        const nRoot = new _Node(root.val);

        let queue: [TreeNode, _Node][] = [[root, nRoot]];

        while(queue.length > 0) {

            const nextQueue: [TreeNode, _Node][] = [];

            for(let i = 0; i < queue.length; i += 1) {

                const [binaryNode, naryNode] = queue[i];
                
                // go left
                let curr: TreeNode | null = binaryNode.left;
                // then go right as far as possible ('N-ary' siblings)
                while(curr !== null) {

                    const naryChild = new _Node(curr.val);
                    naryNode.children.push(naryChild);
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