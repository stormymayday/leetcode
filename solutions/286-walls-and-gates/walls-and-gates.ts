/**
 Do not return anything, modify rooms in-place instead.
 */
function wallsAndGates(rooms: number[][]): void {

    const ROWS = rooms.length;
    const COLS = rooms[0].length;
    
    const visited = new Set<string>();
    const queue: [number, number, number][] = []; // [row, col, distance]

    for(let row = 0; row < ROWS; row += 1) {
        for(let col = 0; col < COLS; col += 1) {
            if(rooms[row][col] === 0) {
                queue.push([row, col, 0]);
                visited.add(`${row},${col}`);
            }
        }
    }

    while(queue.length > 0) {
        const [row, col, distance] = queue.shift();
        const directions: [number, number][] = [
            [-1, 0], // up
            [0, 1], // right
            [1, 0], // down
            [0, -1], // left
        ];
        for(const [rowDelta, colDelta] of directions) {
            const neighborRow = row + rowDelta;
            const neighborCol = col + colDelta;
            const neighborPosition = `${neighborRow},${neighborCol}`;
            if(
                // out of bounds check
                0 <= neighborRow && neighborRow < ROWS &&
                0 <= neighborCol && neighborCol < COLS &&
                // visited check
                !visited.has(neighborPosition) &&
                // wall check
                rooms[neighborRow][neighborCol] !== -1
            ) {
                visited.add(neighborPosition);
                // overwrite the grid value
                rooms[neighborRow][neighborCol] = distance + 1;
                queue.push([neighborRow, neighborCol, distance + 1]);
            }
        }

    }

};