function maxArea(height: number[]): number {
    // Initialize the maximum area found so far to 0
    let maxArea = 0;

    // Set up two pointers - left at the beginning of the array, right at the end
    // This allows us to start with the widest possible container
    let left = 0;
    let right = height.length - 1;

    // Continue the process until the pointers meet
    // When they meet, we've examined all potentially optimal containers
    while (left < right) {
        // Calculate the current area using:
        // 1. The minimum height between the left and right lines (limiting factor)
        // 2. Multiplied by the distance between them (width of the container)
        let currentArea = Math.min(height[left], height[right]) * (right - left);

        // Update maxArea if we found a larger area
        // This keeps track of the best solution as we iterate
        maxArea = Math.max(currentArea, maxArea);

        // The key optimization - move the pointer of the shorter line inward:
        // - Moving the shorter line might find a taller line, potentially increasing area
        // - Moving the taller line would only decrease the width without potential height gain
        if (height[left] > height[right]) {
            // If the right line is shorter, move it inward (leftward)
            right--;
        } else {
            // If the left line is shorter (or equal), move it inward (rightward)
            // Equal heights case: either pointer can move, result will be the same
            left++;
        }
    }

    // Return the maximum area found after checking all optimal configurations
    return maxArea;
}