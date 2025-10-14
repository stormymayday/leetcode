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

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {

    if(inorder.length === 0 || postorder.length === 0) {
        return null;
    }

    const inorderValToIdx = new Map<number, number>();
    for(let i = 0; i < inorder.length; i += 1) {
        inorderValToIdx.set(inorder[i], i);
    }

    function helperDFS(
        inorderLeft: number,
        inorderRight: number,
        postorderLeft: number,
        postorderRight
    ): TreeNode | null {

        if(inorderLeft > inorderRight || postorderLeft > postorderRight) {
            return null;
        }

        const rootVal = postorder[postorderRight];
        const root = new TreeNode(rootVal);
        const rootValIdx = inorderValToIdx.get(rootVal);

        const inorderLeftLength = rootValIdx - inorderLeft;

        root.left = helperDFS(
            inorderLeft,
            rootValIdx - 1,
            postorderLeft,
            postorderLeft + inorderLeftLength - 1
        );

        root.right = helperDFS(
            rootValIdx + 1,
            inorderRight,
            postorderLeft + inorderLeftLength,
            postorderRight - 1
        );

        return root;

    }

    return helperDFS(0, inorder.length - 1, 0, postorder.length -1);

    // if(inorder.length === 0 || postorder.length === 0) {
    //     return null;
    // }

    // const rootVal = postorder[postorder.length - 1];
    // const root = new TreeNode(rootVal);
    // const rootValIdx = inorder.indexOf(rootVal);

    // root.left = buildTree(
    //     inorder.slice(0, rootValIdx),
    //     postorder.slice(0, rootValIdx)
    // );

    // root.right = buildTree(
    //     inorder.slice(rootValIdx + 1),
    //     postorder.slice(rootValIdx, -1)
    // );

    // return root;
    
};