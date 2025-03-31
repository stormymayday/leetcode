function carFleet(target: number, position: number[], speed: number[]): number {

    // Create a tuple array of position and speed pairs
    const positionSpeedPairs = position.map((pos, index) => {
        return [pos, speed[index]];
    });

    // Sort in ascending order
    positionSpeedPairs.sort((a, b) => {
        return a[0] - b[0];
    });

    // stack for time
    const stack = [];

    // Iterate backwards
    for(let i = positionSpeedPairs.length - 1; i >= 0; i--) {

        // get current position and time
        const[position, speed] = positionSpeedPairs[i];
        // calculate the time
        const time = (target - position) / speed;

        // if the stack is empty
        if(stack.length === 0) {
            // push the time
            stack.push(time);
        } else {
            // Otherwise, if the stack is not empty

            // if the current 'time' is greater than time on top of the stack:
            // - Cars cannot become a fleet
            // - Because this car takes longer to get to the target AND it is behind
            if(time > stack[stack.length - 1]) {
                stack.push(time);
            } else {
                // Otherwise, this car will take less time to get to the target
                // - therefore, they can become a fleet
                // - skip pushing to the stack
                continue;
            }
        }

    }

    return stack.length;
    
};