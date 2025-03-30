function dailyTemperatures(temperatures: number[]): number[] {
    // Get the length of the temperatures array
    const n = temperatures.length;

    // Initialize result array with zeros (default when no warmer day exists)
    const result = new Array(n).fill(0);

    // Stack to track temperatures and their indices
    // Each element is [temperature, day index]
    const stack = [];

    // Process temperatures from right to left (backwards)
    for (let i = n - 1; i >= 0; i--) {
        const currentTemperature = temperatures[i];
        const currentDay = i;

        // Remove days with temperatures less than or equal to current
        while (
            stack.length !== 0 &&
            stack[stack.length - 1][0] <= currentTemperature
        ) {
            stack.pop();
        }

        // If stack is not empty after popping, we found a warmer day
        if (
            stack.length !== 0 &&
            stack[stack.length - 1][0] > currentTemperature
        ) {
            // Calculate days until warmer temperature
            result[i] = stack[stack.length - 1][1] - currentDay;
        }

        // Always add current day to stack for future comparisons
        // This is important after all potential pops are done
        stack.push([currentTemperature, currentDay]);
    }

    // Return the array of days until warmer temperature
    return result;
}