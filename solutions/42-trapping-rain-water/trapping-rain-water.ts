function trap(height: number[]): number {
    // Initialize the total trapped water
    let totalWater = 0;

    // Edge case: Need at least 3 bars to trap water (a dip requires at least 3 points)
    if (height.length < 3) {
        return totalWater;
    }

    // Arrays to store the maximum heights to the left and right of each position
    const maxLeft = new Array(height.length).fill(0);
    const maxRight = new Array(height.length).fill(0);

    // Calculate maximum heights to the left of each position
    // For each position i, maxLeft[i] will store the maximum height found to its left
    let prevMaxLeft = 0;
    for (let i = 1; i < height.length; i++) {
        // Update the running maximum if the previous bar is taller
        if (height[i - 1] > prevMaxLeft) {
            prevMaxLeft = height[i - 1];
        }
        // Store the maximum height to the left of current position
        maxLeft[i] = prevMaxLeft;
    }

    // Calculate maximum heights to the right of each position
    // For each position i, maxRight[i] will store the maximum height found to its right
    let prevMaxRight = 0;
    for (let i = height.length - 2; i >= 0; i--) {
        // Update the running maximum if the next bar is taller
        if (height[i + 1] > prevMaxRight) {
            prevMaxRight = height[i + 1];
        }
        // Store the maximum height to the right of current position
        maxRight[i] = prevMaxRight;
    }

    // Calculate water trapped at each position
    for (let i = 0; i < height.length; i++) {
        // Water trapped at position i is the minimum of tallest bars to the left and right
        // minus the height of the current bar
        let currentWater = Math.min(maxLeft[i], maxRight[i]) - height[i];

        // Only add positive values (can't have negative water)
        if (currentWater > 0) {
            totalWater += currentWater;
        }
    }

    return totalWater;
}