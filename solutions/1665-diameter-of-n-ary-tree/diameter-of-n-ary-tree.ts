/**
 * Definition for _Node.
 * class _Node {
 *     val: number
 *     children: _Node[]
 * 
 *     constructor(val?: number, children?: _Node[]) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.children = (children===undefined ? [] : children)
 *     }
 * }
 */


function diameter(root: _Node): number {

    let longestPath = 0;

    if(root === null || root.children.length === 0) {
        return longestPath;
    }

    // This function returns height at a given node
    // The longest path is calculated in-between via
    // Formula: The Longest Path (diameter) = sum of two longest paths starting at a given node
    function helper(node: _Node): number {
        // Base Case: if node has no children, it's height is 1
        if(node.children.length === 0) {
            return 1;
        }

        // Get the height of two tallest subtrees
        let tallestSubtree = 0;
        let secondTallestSubtree = 0;
        for(const child of node.children) {
            // 1. Get height of subtree rooted at current child
            const height = helper(child);
            // 2. If the height is greater than the tallest (so far)
            if(height > tallestSubtree) {
                // 2.1 Overwrite the second tallest value
                secondTallestSubtree = tallestSubtree;
                // 2.2 Update the tallest
                tallestSubtree = height;
            } 
            // 3. If height is only greater than the second tallest
            else if(height > secondTallestSubtree) {
                // 3.1 Upadate the second tallest
                secondTallestSubtree = height;
            }
        }

        // Calculate longest path at the current node updating the global max
        // Formula: longest path = tallest subtree height + second tallest subtree height
        longestPath = Math.max(longestPath, tallestSubtree + secondTallestSubtree);

        // Return height at the current node
        return 1 + tallestSubtree;

    }

    helper(root);

    return longestPath;
    
};