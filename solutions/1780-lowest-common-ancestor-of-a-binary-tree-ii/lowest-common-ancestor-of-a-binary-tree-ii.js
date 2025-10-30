/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {

    if (root === null || p === null || q === null) {
        return null;
    }

    let foundP = false;
    let foundQ = false;

    function postorderDFS(node) {

        // Base Case: reached a null node
        if (node === null) {
            return null;
        }

        const leftSubtree = postorderDFS(node.left);
        const rightSubtree = postorderDFS(node.right);

        // If current node quals either p or q
        if (node === p || node === q) {
            if (node === p) {
                foundP = true;
                return node;
            }
            if (node === q) {
                foundQ = true;
                return node;
            }
        }

        // Current node doesn't equal to p or q

        // Perhaps p or q were found in the leftSubtree or rightSubtree

        // If both subtrees return non null, current node is the lca
        if (leftSubtree !== null && rightSubtree !== null) {
            return node;
        }

        // Otherwise, return either leftSubtree or rightSubtree
        // Both could be null. Therefore, keep propogating 'null' from the Base Case
        return leftSubtree !== null ? leftSubtree : rightSubtree;

    }

    const lca = postorderDFS(root);

    if (foundP === true && foundQ === true && lca !== null) {
        return lca;
    } else {
        return null;
    }

};