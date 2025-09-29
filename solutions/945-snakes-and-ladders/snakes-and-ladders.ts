function snakesAndLadders(board: number[][]): number {

    // 1. Flatten the board into an array
    const flat: number[] = [];
    // Starting from the bottom row, going up and reversing in an alternate matter
    let reverse = false; // staring with reverse flag set to false (i.e. we are not reversing bottom row)
    for(let row = board.length - 1; row >= 0; row -= 1) {
        if(reverse === true) {
            // flat.push(...board[row].reverse()); // does work, but mutates the original matrix
            flat.push(...[...board[row]].reverse()); // Copy first to avoid mutation
            reverse = false;
        } else {
            flat.push(...board[row]);
            reverse = true;
        }
    }

    // 2. Run BFS?
    // - Note: Array is zero index based, while values assume it is 1 index based
    // - Therefore, subract 1 from anthyting other than -1
    let queue: [number, number][] = []; // [index, moves]
    queue.push([0, 0]); // starting at index 0 with 0 moves

    // might need a visited set / array
    const visited: boolean[] = new Array(flat.length).fill(false);
    visited[0] = true;

    while(queue.length > 0) {

        const nextQueue: [number, number][] = [];
        for(let i = 0; i < queue.length; i += 1) {

            const [currNodeIdx, currMoves] = queue[i];

            if(currNodeIdx === flat.length - 1) {
                return currMoves;
            }

            // neighbors based on a dice roll
            for(let diceRoll = 1; diceRoll <= 6; diceRoll += 1) {

                let neighborNodeIdx = currNodeIdx + diceRoll;

                if(
                    // Out of bounds check
                    // 0 <= neighborNodeIdx
                    neighborNodeIdx < flat.length &&
                    // visited check
                    visited[neighborNodeIdx] === false
                ) {

                    // Mark as visited FIRST
                    visited[neighborNodeIdx] = true;

                     // Check Ladder or Snake
                    if(flat[neighborNodeIdx] !== -1) {
                        neighborNodeIdx = flat[neighborNodeIdx] - 1;
                    }

                    nextQueue.push([neighborNodeIdx, currMoves + 1]);

                }

            }

        }

        if(nextQueue.length > 0) {
            queue = nextQueue;
        } else {
            break;
        }

    }

    return -1; // not possible to reach the end
    
};