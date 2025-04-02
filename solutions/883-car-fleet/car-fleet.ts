function carFleet(target: number, position: number[], speed: number[]): number {
    
    // To store Time (Time = (Target - Position)/Speed)
    const stack = [];

    // Positon & Speed pairs array
    const positionSpeedPairs = position.map((pos, index) => {
        return [pos, speed[index]];
    });

    // Sort the pairs array based on position in ASC order
    positionSpeedPairs.sort((a, b) => a[0] - b[0]);

    // Iterate backwards
    for(let i = positionSpeedPairs.length - 1; i >= 0; i--) {

        const [currentPosition, currentSpeed] = positionSpeedPairs[i];
        const currentTime = (target - currentPosition)/currentSpeed;

        if(stack.length === 0) {
            stack.push(currentTime);
        } else {

            // MAIN LOGIC:
            // If the top element has smaller time (it's faster) than the current one (the car behind)
            // They can't become fleet (car behind won't catch up)
            // Therefore, push (different fleet)
            // Otherwise, don't push (same fleet)

            if(stack[stack.length - 1] < currentTime) {
                stack.push(currentTime);
            }
        }

    }

    // Number of elements on the stack === number of fleets
    return stack.length;
    
};