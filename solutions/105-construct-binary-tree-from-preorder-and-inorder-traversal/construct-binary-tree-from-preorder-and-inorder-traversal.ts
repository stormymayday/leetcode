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

    if(preorder.length === 0 || inorder.length === 0) {
        return null;
    }

    const inorderValToIdx = new Map<number, number>();
    for(let i = 0; i < inorder.length; i += 1) {
        inorderValToIdx.set(inorder[i], i);
    }

    function helperDFS(
        inorderLeft: number,
        inorderRight: number,
        preorderLeft: number,
        preorderRight: number
    ): TreeNode | null {

        if(inorderLeft > inorderRight || preorderLeft > preorderRight) {
            return null;
        }

        const rootVal = preorder[preorderLeft];
        const root = new TreeNode(rootVal);
        const rootIdx = inorderValToIdx.get(rootVal);

        const inorderLeftLength = rootIdx - inorderLeft;

        root.left = helperDFS(
            inorderLeft,
            rootIdx - 1,
            preorderLeft + 1,
            preorderLeft + 1 + inorderLeftLength - 1
        );

        root.right = helperDFS(
            rootIdx + 1,
            inorderRight,
            preorderLeft + 1 + inorderLeftLength,
            preorderRight
        );

        return root;

    }

    return helperDFS(0, inorder.length - 1, 0, preorder.length - 1);

};