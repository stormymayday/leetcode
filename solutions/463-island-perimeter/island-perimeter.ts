function islandPerimeter(grid: number[][]): number {
    
    let result = 0;

    outer: for(let row = 0; row < grid.length; row += 1) {
        for(let col = 0; col < grid[0].length; col += 1) {
            if(grid[row][col] === 1) {
                result = dfs(row, col, grid, new Set<string>());
                break outer;
            }
        }
    }

    return result;

};

function dfs(row: number, col: number, grid: number[][], visited: Set<string>): number {
    // Base Case 1: out of bounds
    if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length) {
        return 1;
    }

    // Base Case 2: water
    if(grid[row][col] === 0) {
        return 1;
    }

    // Base Case 3: visited
    const position = `${row},${col}`;
    if(visited.has(position)) {
        return 0;
    }
    visited.add(position);

    let perimeter = 0;

    perimeter += dfs(row - 1, col, grid, visited); // up
    perimeter += dfs(row, col + 1, grid, visited); // right
    perimeter += dfs(row + 1, col, grid, visited); // down
    perimeter += dfs(row, col - 1, grid, visited); // left

    return perimeter;
}