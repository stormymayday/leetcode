function findMissingAndRepeatedValues(grid: number[][]): number[] {

    const res: number[] = []; // first is dupe, second is missing
    const uniques = new Set<number>();

    for(let row = 0; row < grid.length; row += 1) {
        for(let col = 0; col < grid[0].length; col += 1) {

            // 1. Duplicate
            if(uniques.has(grid[row][col])) {
                res[0] = grid[row][col];
            }

            uniques.add(grid[row][col]);

        }
    }

    for(let i = 1; i <= grid.length * grid.length; i += 1) {
        // 2. Missing
        if(!uniques.has(i)) {
            res[1] = i;
        }
    }

    return res;
};