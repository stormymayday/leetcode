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

function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
	if(root === null || p === null || q === null) {
        return null;
    }

    const path1 = findPath(root, q);
    const path2 = findPath(root, p);

    if(path1 === null || path2 === null) {
        return null;
    }

    const set = new Set(path1);

    for(const node of path2) {
        if(set.has(node)) {
            return node;
        }
    }

    return null;
};

function findPath(root: TreeNode | null, target: TreeNode | null): TreeNode[] | null {
    if(root === null) {
        return null;
    }

    if(root === target) {
        return [root];
    }

    const left = findPath(root.left, target);
    if(left !== null) {
        left.push(root);
        return left;
    }

    const right = findPath(root.right, target);
    if(right !== null) {
        right.push(root);
        return right;
    }

    return null;
}