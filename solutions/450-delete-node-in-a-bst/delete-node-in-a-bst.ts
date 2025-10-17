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

function deleteNode(root: TreeNode | null, key: number): TreeNode | null {

    function helperDFS(node: TreeNode | null, key: number): TreeNode | null {

        if(node === null) {
            return null;
        }
        
        if(key < node.val) {
            node.left = helperDFS(node.left, key);
        } else if(key > node.val) {
            node.right = helperDFS(node.right, key);
        } else {

            if(node.left === null && node.right === null) {
                node = null;
            } else if(node.left === null) {
                node = node.right;
            } else if(node.right === null) {
                node = node.left;
            } else {

                // let predecessor = node.left
                // while(predecessor.right !== null) {
                //     predecessor = predecessor.right;
                // }
                // node.val = predecessor.val;
                // node.left = helperDFS(node.left, predecessor.val);

                let successor = node.right;
                while(successor.left !== null) {
                    successor = successor.left;
                }
                node.val = successor.val;
                node.right = helperDFS(node.right, successor.val);

            }

        }

        return node;

    }

    root = helperDFS(root, key);

    return root;
    
};