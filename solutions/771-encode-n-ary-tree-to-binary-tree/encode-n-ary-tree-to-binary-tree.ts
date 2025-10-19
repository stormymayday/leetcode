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

        const bNode = new TreeNode(root.val);
        const naryChildren = root.children;
        if(naryChildren.length > 0) {

            bNode.left = this.serialize(naryChildren[0]);
            
            let curr: TreeNode | null = bNode.left;
            for(let j = 1; j < naryChildren.length; j += 1) {
                curr.right = this.serialize(naryChildren[j]);
                curr = curr.right;
            }
            
        }

        return bNode;
    };
	
    // Decodes your encoded data to tree.
    deserialize(root: TreeNode | null): _Node | null {

        if(root === null) {
            return null;
        }

        const naryNode = new _Node(root.val);

        let curr: TreeNode | null = root.left;
        while(curr !== null) {
            naryNode.children.push(this.deserialize(curr));
            curr = curr.right;
        }

        return naryNode;
        
    };
}

// Your Codec object will be instantiated and called as such:
// Codec codec = new Codec();
// codec.deserialize(codec.serialize(root));