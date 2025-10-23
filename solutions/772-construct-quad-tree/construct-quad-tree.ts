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

    if(grid.length === 0) {
        return null;
    }

    function helper(grid: number[][], rowStart: number, rowEnd: number, colStart: number, colEnd: number): _Node | null {

        // traverse the grid to see if all values in this region are the same
        let val = grid[rowStart][colStart];
        let isLeaf = true;
        outer: for(let row = rowStart; row <= rowEnd; row += 1) {
            for(let col = colStart; col <= colEnd; col += 1) {
                if(val !== grid[row][col]) {
                    isLeaf = false;
                    break outer;
                }
            }
        }

        // Base Case: all values are the same, it's a leaf
        if(isLeaf === true) {
            const nodeVal: boolean = val === 1 ? true : false;
            return new _Node(nodeVal, true); // value, isLeaf
        }

        // Otherwise, it's not a leaf, create a new node and divide grid into 4 quadrants
        const node = new _Node(false, false); // val is false (arbitrarily), isLeaf is false

        // Key! 
        const rowMid = Math.floor((rowStart + rowEnd) / 2);
        const colMid = Math.floor((colStart + colEnd) / 2);

        node.topLeft = helper(grid, rowStart, rowMid, colStart, colMid);
        node.topRight = helper(grid, rowStart, rowMid, colMid + 1, colEnd);
        node.bottomLeft = helper(grid, rowMid + 1, rowEnd, colStart, colMid);
        node. bottomRight = helper(grid, rowMid + 1, rowEnd, colMid + 1, colEnd);

        return node;

    }

    return helper(grid, 0, grid.length - 1, 0, grid.length - 1);

};