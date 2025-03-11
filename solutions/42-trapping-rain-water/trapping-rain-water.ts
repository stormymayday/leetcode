function trap(height: number[]): number {
    // Initialize variable to track total trapped water
    let totalWater = 0;

    // Set up two pointers - one starting at the left end, one at the right end
    let left = 0;
    let right = height.length - 1;

    // Keep track of the maximum height seen from left and right sides
    let leftMax = 0;
    let rightMax = 0;

    // Continue until the two pointers meet
    while(left < right) {
        // Compare heights at left and right pointers to decide which side to process
        if(height[left] > height[right]) { 
            // Right side has smaller height, so it limits how much water can be trapped
            if(height[right] >= rightMax) {
                // If current height is the new maximum from right side, update rightMax
                // No water can be trapped here (no higher wall to the right)
                rightMax = height[right];
            } else {
                // Water can be trapped here - amount is difference between rightMax and current height
                totalWater += rightMax - height[right];
            }
            // Move right pointer inward
            right--;
        } else {
            // Left side has smaller or equal height, so work with left side
            if(height[left] >= leftMax) {
                // If current height is the new maximum from left side, update leftMax
                // No water can be trapped here (no higher wall to the left)
                leftMax = height[left];
            } else {
                // Water can be trapped here - amount is difference between leftMax and current height
                totalWater += leftMax - height[left];
            }
            // Move left pointer inward
            left++;
        }
    }
    // Return the total amount of water trapped
    return totalWater;
};