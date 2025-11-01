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

function bstFromPreorder(preorder: number[]): TreeNode | null {

    if(preorder.length === 0) {
        return null;
    }

    const inorder: number[] = [...preorder];
    inorder.sort((a, b) => a - b); // Important! sort after copying. Otherwise original preorder is getting mutated

    const inorderValToIdx = new Map<number, number>();
    for(let i = 0; i < inorder.length; i += 1) {
        inorderValToIdx.set(inorder[i], i);
    }

    function helper(
        inorderLeft: number, 
        inorderRight: number,
        preorderLeft: number,
        preorderRight: number
    ): TreeNode |null {

        if(preorderLeft > preorderRight || inorderLeft > inorderRight) {
            return null;
        }

        const root = new TreeNode(preorder[preorderLeft]);
        const rootIdx = inorderValToIdx.get(preorder[preorderLeft]);

        const leftLength = rootIdx - inorderLeft;

        root.left = helper(
            inorderLeft,
            rootIdx - 1,
            preorderLeft + 1,
            preorderLeft + leftLength
        );

        root.right = helper(
            rootIdx + 1,
            inorderRight,
            preorderLeft + leftLength + 1,
            preorderRight
        );

        return root;

    }

    return helper(0, inorder.length - 1, 0, preorder.length - 1);
    
};