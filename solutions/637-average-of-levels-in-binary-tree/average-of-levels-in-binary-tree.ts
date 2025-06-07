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

function averageOfLevels(root: TreeNode | null): number[] {
    if(root === null) {
        return [];
    }

    const levels = [];
    const stack = [{node: root, levelNum: 0}];
    while(stack.length > 0) {

        const { node, levelNum } = stack.pop();

        if(levels[levelNum] === undefined) {
            levels[levelNum] = [];
        }
        levels[levelNum].push(node.val);

        if(node.right !== null) {
            stack.push({node: node.right, levelNum: levelNum + 1});
        }

        if(node.left !== null) {
            stack.push({node: node.left, levelNum: levelNum + 1});
        }

    }

    const averages = [];
    for(const level of levels) {
        let levelSum = 0;
        for(let i = 0; i < level.length; i += 1) {
            levelSum += level[i];
        }
        averages.push(levelSum/level.length);
    }

    return averages;

};