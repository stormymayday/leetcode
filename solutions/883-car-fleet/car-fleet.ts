function carFleet(target: number, position: number[], speed: number[]): number {

    const positionSpeedPairs = position.map((pos, index) => {
        return [pos, speed[index]];
    });

    positionSpeedPairs.sort((a, b) => {
        return a[0] - b[0];
    });

    const stack = [];

    for(let i = positionSpeedPairs.length - 1; i >= 0; i--) {

        const[position, speed] = positionSpeedPairs[i];
        const time = (target - position) / speed;

        if(stack.length === 0) {
            stack.push(time);
        } else {
            if(time > stack[stack.length - 1]) {
                stack.push(time);
            } else {
                continue;
            }
        }

    }

    return stack.length;
    
};