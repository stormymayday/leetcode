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

    function dfs(node) {
        if (node === null) {
            return null;
        }

        const leftSubtree = dfs(node.left);
        const rightSubtree = dfs(node.right);

        if(node === p || node == q) {
            if(node === p) {
                foundP = true;
                return node;
            } else {
                foundQ = true;
                return node;
            }
        }

        if(leftSubtree !== null && rightSubtree !== null) {
            return node;
        } else {
            return leftSubtree !== null ? leftSubtree : rightSubtree;
        }
        
    }

    const lca = dfs(root);
    
    if(foundP === true && foundQ === true) {
        return lca;
    } else {
        return null;
    }

};