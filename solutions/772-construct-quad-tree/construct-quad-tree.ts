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
        
        // Optinal Base Case: length is 1
        if(length === 1) {
            // const value = grid[startRow][startCol] === 1 ? true : false;
            const value = grid[startRow][startCol] === 1;
            return new _Node(value, true);
        }

        // Check if all values in this quadrant are the same
        let isSame: boolean = true;
        const firstVal = grid[startRow][startCol]
        outer: for(let row = startRow; row < startRow + length; row += 1) {
            for(let col = startCol; col < startCol + length; col += 1) {
                if(grid[row][col] !== firstVal) {
                    isSame = false;
                    break outer;
                }
            }
        }

        // Base Case: value is same, create a leaf node
        if(isSame === true) {
            // const value = firstVal === 1 ? true : false;
            const value = grid[startRow][startCol] === 1;
            return new _Node(value, true);
        }

        // Otherwise, it's not a leaf, create a parent node
        const node = new _Node(false, false); // value does not matter, arbitrarily set to 'false'
        // const newLength = Math.floor(length / 2); // do we need to floor if length is always even?
        const newLength = length / 2; // apparently we don't need to floor
        node.topLeft = helper(newLength, startRow, startCol);
        node.topRight = helper(newLength, startRow, startCol + newLength);
        node.bottomLeft = helper(newLength, startRow + newLength, startCol);
        node.bottomRight = helper(newLength, startRow + newLength, startCol + newLength);

        return node;
    }

    return helper(grid.length, 0, 0);

};