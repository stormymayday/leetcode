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
var lowestCommonAncestor = function(root, p, q) {

    let res = null;

    function postorderDFS(node) {
        if(node === null) {
            return false;
        }

        const leftSubtree = postorderDFS(node.left);
        const rightSubtree = postorderDFS(node.right);

        // Current node is LCA
        if(
            (leftSubtree === true && rightSubtree === true) ||
            ((leftSubtree === true || rightSubtree === true) && (node === p || node === q))
            ) {
            res = node;
            return true;
        } else if(
            (node === p || node === q) || (leftSubtree === true || rightSubtree === true)
        ) {
            return true;
        }

    }

    postorderDFS(root);

    return res;
    
};