/**
 * Definition for _Node.
 * class _Node {
 *     val: boolean
 *     isLeaf: boolean
 *     topLeft: _Node | null
 * 	topRight: _Node | null
 * 	bottomLeft: _Node | null
 * 	bottomRight: _Node | null
 * 	constructor(val?: boolean, isLeaf?: boolean, topLeft?: _Node, topRight?: _Node, bottomLeft?: _Node, bottomRight?: _Node) {
 *         this.val = (val===undefined ? false : val)
 *         this.isLeaf = (isLeaf===undefined ? false : isLeaf)
 *         this.topLeft = (topLeft===undefined ? null : topLeft)
 *         this.topRight = (topRight===undefined ? null : topRight)
 *         this.bottomLeft = (bottomLeft===undefined ? null : bottomLeft)
 *         this.bottomRight = (bottomRight===undefined ? null : bottomRight)
 *   }
 * }
 */


function construct(grid: number[][]): _Node | null {

    function helper(length: number, startRow: number, startCol: number): _Node | null {

        // Base Case: Return a leaf node if the matrix size is one
        if (length === 1) {
            // slick type comparison
            const value = grid[startRow][startCol] === 1;
            return new _Node(value, true);
        }

        // Recursive calls to the four sub-matrices.
        const newLength = length / 2; // don't need to floor, length is always even
        const topLeft = helper(newLength, startRow, startCol);
        const topRight = helper(newLength, startRow, startCol + newLength);
        const bottomLeft = helper(newLength, startRow + newLength, startCol);
        const bottomRight = helper(newLength, startRow + newLength, startCol + newLength);

        // If the four returned nodes are leaf and have the same values
        // Return a leaf node with the same value.
        if (
            (topLeft.isLeaf && topRight.isLeaf && bottomLeft.isLeaf && bottomRight.isLeaf) &&
            (
                (topLeft.val === topRight.val) &&
                (topRight.val === bottomLeft.val) &&
                (bottomLeft.val === bottomRight.val)
            )
        ) {
            return new _Node(topLeft.val, true);
        }
        // Otherwise, the nodes aren't identical, return a non-leaf node with corresponding child pointers.
        else {
            // first argument, value is arbitrarily 'false'
            return new _Node(false, false, topLeft, topRight, bottomLeft, bottomRight);
        }

    }

    return helper(grid.length, 0, 0);

};