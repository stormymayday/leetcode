function dailyTemperatures(temperatures: number[]): number[] {
    
    const n = temperatures.length;

    const result = new Array(n).fill(0);

    const stack = [];

    // Going forward
    for(let i = 0; i < n; i++) {

        const currentTemp = temperatures[i];
        const currentDayIndex = i;

        // While stack is not empty AND currentTemp is STRICTLY greater than top of the stack
        while(stack.length !== 0 && currentTemp > stack[stack.length - 1][0]) {
            // Pop and calculate the result
            const [temperature, dayIndex] = stack.pop();
            result[dayIndex] = currentDayIndex - dayIndex;
        }

        // Push the tuple
        stack.push([currentTemp, currentDayIndex]);

    }

    return result;

};