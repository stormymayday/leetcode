function largestRectangleArea(heights: number[]): number {

     // Track the maximum rectangle area found so far
    let maxArea = 0;

    // Stack to maintain heights and their corresponding leftmost possible index
    // Each element in stack is [height, index] where index is the leftmost position where this height can be extended
    const stack = [];
    
    // Iterate through each bar in the histogram
    for(let i = 0; i < heights.length; i++) {

        // Current height at position i
        const currentHeight = heights[i];

        // startIndex will be used to track where the current height starts from
        // initially set to current position
        let startIndex = i;

        // Process all bars in stack that are taller than current height
        // This is because taller bars cannot extend beyond the current position
        while(stack.length !== 0 && stack[stack.length - 1][0] > currentHeight) {

            // Pop the taller height and its starting position from stack
            const [height, index] = stack.pop();

            // Calculate area for the popped bar: height × width
            // width = current position - starting position
            maxArea = Math.max(maxArea, height * (i - index));

            // The current height can extend left to the position where the popped height started
            startIndex = index;
        }

        // Push current height with its leftmost possible position
        // If we popped elements, startIndex has been updated to the leftmost possible position
        stack.push([currentHeight, startIndex]);
    }

    // Process remaining heights in the stack
    // These heights can extend all the way to the end of the histogram
    while(stack.length !== 0) {
        
        // Pop height and its starting index
        const [height, index] = stack.pop();

        // Calculate area: height × (total length - starting index)
        // This is because these heights extend from their starting index to the end
        maxArea = Math.max(maxArea, height * (heights.length - index));
    }

    return maxArea;
};