function openLock(deadends: string[], target: string): number {
    
    const visited = new Set<string>(deadends);

    // Edge Case: starting point is a deadend
    if(visited.has("0000")) {
        return -1;
    }

    // Initiazling the BFS queue
    const queue: [string, number][] = [];
    queue.push(["0000", 0]); // starting point with distance of 0
    visited.add("0000");

    // BFS
    while(queue.length > 0) {
        const [currNode, currDist] = queue.shift();
        if(currNode === target) {
            return currDist;
        }
        for(const neighbor of getNeighbors(currNode)) {
            if(!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push([neighbor, currDist + 1]);
            }
        }
    }
    return -1; // can't reach the target
};

function getNeighbors(node: string): string[] {
    const neighbors: string[] = [];
    for(let i = 0; i < node.length; i += 1) {

        // 1. Create two copies of node string as string arrays
        const copy1 = [...node.split("")];
        const copy2 = [...node.split("")];

        // 2. Extract character at current index
        const char = node[i];

        // 3. Convert character into a number
        const num = Number(char);

        // 4. Increment number by one circling back to 0 if result reaches 10
        const plusOne = (num + 1) % 10;

        // 5. Decrement number by one circling back to 9 if result dips below 0
        const minusOne = num === 0 ? 9 : num - 1;

        // 6. Convert 'plusOne' into a string and insert it into 'copy1' overwriting value at current index
        copy1[i] = String(plusOne);

        // 7. Convert 'minusOne' into a string and insert in into 'copy2' overwriting value at current index
        copy2[i] = String(minusOne);

        // 8. Push 'copy1' and 'copy2' into 'neighbors' converting them into strings
        neighbors.push(copy1.join(""));
        neighbors.push(copy2.join(""));
    }
    return neighbors;
}