function floodFill(image: number[][], sr: number, sc: number, color: number): number[][] {

    const visited: boolean[][] = new Array(image.length);
    for(let row = 0; row < image.length; row += 1) {
        visited[row] = new Array(image[0].length).fill(false);
    }
    matrixDFS(sr, sc, image, visited, image[sr][sc], color);

    return image;

};

function matrixDFS(row: number, col: number, grid: number[][], visited: boolean[][], original: number, color: number): void {

    // Base Case: out of bounds
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return;
    }

    // Base Case: visited
    if(visited[row][col] === true) {
        return;
    }

    // Base Case: value check
    if(grid[row][col] !== original) {
        return;
    }

    visited[row][col] = true;
    grid[row][col] = color;

    const directions: [number, number][] = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1], // left
    ];
    for(const [rowDelta, colDelta] of directions) {
        const neighborRow = row + rowDelta;
        const neighborCol = col + colDelta;
        matrixDFS(neighborRow, neighborCol, grid, visited, original, color);
    }

}