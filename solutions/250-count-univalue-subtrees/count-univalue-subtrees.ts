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

function countUnivalSubtrees(root: TreeNode | null): number {
    const [isUnivalue, subtreeCount] = dfs(root);
    return subtreeCount;
}

// The dfs function returns an array with 2 elements: [boolean, number]
// - Index 0: A boolean indicating if the subtree is uni-value
// - Index 1: The count of uni-value subtrees in that subtree
// Note: Each recursive call should create and return its own result array
function dfs(root: TreeNode | null): [boolean, number] {

    // Base Case 1: Null Node
    if (root === null) {
        return [true, 0];
        // Why true?
        // - A null node doesn't contradict the uni-value property
        // - It allows parent nodes to continue checking if they're uni-value
        // - Think of it as "vacuously true" - an empty subtree has all nodes with the same value (because there are no nodes)
        
        // Why 0?
        // - Null nodes aren't actual subtrees, so they don't count
        // We only count subtrees that have at least one node
    }

    // Base Case 2: Leaf Node
    if (root.left === null && root.right === null) {
        // every leaf not is considerend uni-value subtree
        return [true, 1];
        // Why true?
        // - A single node by itself always has the same value (trivially uni-value)
        // - It's the building block for larger uni-value subtrees

        // Why 1?
        // Each leaf node counts as exactly one uni-value subtree
        // This is where we start accumulating our count
    }

    // Recurse Left and Right
    const left = dfs(root.left);
    const right = dfs(root.right);

    // Start with the counts from left and right subtrees
    let count = left[1] + right[1];

    // Check if current subtree is uni-value
    let isUniValue = left[0] && right[0];

    if (isUniValue) {
        // Also need to check if children values match parent
        if (root.left !== null && root.left.val !== root.val) {
            isUniValue = false;
        }
        if (root.right !== null && root.right.val !== root.val) {
            isUniValue = false;
        }

        // If still uni-value, increment count
        if (isUniValue) {
            count += 1;
        }
    }

    return [isUniValue, count];
}