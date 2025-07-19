/**
 * class Robot {
 *      // Returns true if the cell in front is open and robot moves into the cell.
 *      // Returns false if the cell in front is blocked and robot stays in the current cell.
 * 		move(): boolean {}
 * 		
 *      // Robot will stay in the same cell after calling turnLeft/turnRight.
 *      // Each turn will be 90 degrees.
 * 		turnRight() {}
 * 		
 *      // Robot will stay in the same cell after calling turnLeft/turnRight.
 *      // Each turn will be 90 degrees.
 * 		turnLeft() {}
 * 		
 * 		// Clean the current cell.
 * 		clean(): {}
 * }
 */

function cleanRoom(robot: Robot) {
    const directions = [
        [-1, 0], // up
        [0, 1], // right
        [1, 0], // down
        [0, -1] // left
    ];
    const visited = new Set<string>();
    function helper(row: number, col: number, direction: number): void {
        robot.clean();
        visited.add(`${row},${col}`);
        for(let i = 0; i < 4; i += 1) {

            const newDirection = (direction + i) % 4;
            const neighborRow = row + directions[newDirection][0];
            const neighborCol = col + directions[newDirection][1];

            if(!visited.has(`${neighborRow},${neighborCol}`) && robot.move()) {

                helper(neighborRow, neighborCol, newDirection);

                robot.turnRight();
                robot.turnRight();
                robot.move();
                robot.turnRight();
                robot.turnRight();

            }

            robot.turnRight();

        }
    }
    helper(0,0,0);
};