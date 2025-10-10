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

    if (root === null) {
        return null;
    }

    if (key < root.val) {
        root.left = deleteNode(root.left, key);
    } else if (key > root.val) {
        root.right = deleteNode( root.right, key);
    } else {
        if (root.left === null && root.right === null) {
            return null;
        } else if (root.left === null) {
            root = root.right;
        } else if (root.right === null) {
            root = root.left;
        } else {
            const subTreeMin = minval(root.right);
            root.val = subTreeMin;
            root.right = deleteNode(root.right, subTreeMin);
        }
    }

    return root;
};

function minval(currentNode) {
    while (currentNode.left !== null) {
        currentNode = currentNode.left;
    }
    return currentNode.val;
}