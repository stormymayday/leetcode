function spiralOrder(matrix: number[][]): number[] {

    const ROWS = matrix.length;
    const COLS = matrix[0].length;

    let top = 0;
    let bot = ROWS - 1;
    let left = 0;
    let right = COLS - 1;

    const res: number[] = new Array(ROWS * COLS);
    let idx = 0;

    while (top <= bot && left <= right) {

        // 1. Reading Top Row column by column (left -> right)
        for (let col = left; col <= right; col += 1) {
            res[idx] = matrix[top][col];
            idx += 1;
        }
        // "Folding" Top Row
        top += 1;
        // Note: Rows can cross at this point
        // if they do, 'Reading Right Col' will not run because row > bot
        // However, 'Reading Bot Row' will crash if left and right cols have not crossed yet
        // Therefore, perform a check after 'Reading Right Col'!

        // 2. Reading Right Col row by row (top -> down)
        for (let row = top; row <= bot; row += 1) {
            res[idx] = matrix[row][right];
            idx += 1;
        }
        // "Folding" Right Col
        right -= 1;

        // 3. Check if either rows or cols have crossed!
        if (top > bot || left > right) {
            break;
        }

        // 4. Reading Bot Row column by column (left <- right)
        for (let col = right; col >= left; col -= 1) {
            res[idx] = matrix[bot][col];
            idx += 1;
        }
        // "Folding" Bot Row
        bot -= 1;

        // 5. Reading Left Col row by row (bot -> top)
        for (let row = bot; row >= top; row -= 1) {
            res[idx] = matrix[row][left];
            idx += 1;
        }
        // "Folding" Left Col
        left += 1;

    }

    return res;

};