function trap(height: number[]): number {
    // Initialize the total amount of trapped water
    let totalWater = 0;
    // Get the length of the input array
    const n = height.length;
    
    // Edge case: if the array is empty, return 0
    if(n === 0) {
        return totalWater;
    }
    
    // Arrays to store the maximum heights to the left and right of each position
    let maxLeft = new Array(n).fill(0);
    let maxRight = new Array(n).fill(0);
    
    // Calculate the maximum height to the left of each position
    // Note: maxLeft[i] represents the maximum height strictly to the left of position i
    for(let i = 1; i < n; i++) {
        maxLeft[i] = Math.max(height[i - 1], maxLeft[i - 1]);
    }
    
    // Calculate the maximum height to the right of each position
    // Note: maxRight[i] represents the maximum height strictly to the right of position i
    for(let i = n - 2; i >= 0; i--) {
        maxRight[i] = Math.max(height[i + 1], maxRight[i + 1]);
    }
    
    // Calculate water trapped at each position
    for(let i = 0; i < n; i++) {
        // Water trapped at position i is the minimum of the tallest bars to the left
        // and right, minus the height at position i
        const currentWater = Math.min(maxLeft[i], maxRight[i]) - height[i];
        
        // Only add positive values (can't have negative water)
        if(currentWater > 0) {
            totalWater += currentWater;
        }
    }
    
    return totalWater;
}