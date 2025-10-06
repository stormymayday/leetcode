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

function buildTree(preorder: number[], inorder: number[]): TreeNode | null {

    const inorderValToIdx = new Map<number, number>();
    for (let idx = 0; idx < inorder.length; idx += 1) {
        const val = inorder[idx];
        inorderValToIdx.set(val, idx);
    }

    function dfs(
        inorderLeftIdx: number,
        inorderRightIdx: number,
        preorderLeftIdx: number,
        preorderRightIdx: number
    ): TreeNode | null {

        // Base Case: left and right 'inorder' pointers cross
        if (inorderLeftIdx > inorderRightIdx) {
            return null;
        }

        // Create a root
        const rootVal = preorder[preorderLeftIdx];
        const root = new TreeNode(rootVal);

        // Get the 'rootVal' index
        const rootIdx = inorderValToIdx.get(rootVal);

        // Calculate left subtree size
        const leftSubtreeSize = rootIdx - inorderLeftIdx;

        // Construct Left Subtree
        root.left = dfs(
            inorderLeftIdx, // 'inorderLeftIdx' stays the same (start of the array)
            rootIdx - 1, // 'inorderRightIdx' goes 1 spot behind 'rootIdx'
            preorderLeftIdx + 1, // 'preorderLeftIdx' shifts 1 spot forward (skipping 'root')
            preorderLeftIdx + leftSubtreeSize // 
        );

        // Construct Right Subtree
        root.right = dfs(
            rootIdx + 1, // 'inorderLeftIdx' goes 1 spot after 'rootIdx'
            inorderRightIdx, // 'inorderRightIdx' stays the same (end of the array)
            preorderLeftIdx + leftSubtreeSize + 1, // 
            preorderRightIdx // 'preorderRightIdx' stays the same (end if the array)
        );

        return root;
    }

    return dfs(
        0,
        inorder.length - 1,
        0,
        preorder.length - 1
    );

};