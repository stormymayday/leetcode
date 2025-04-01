function largestRectangleArea(heights: number[]): number {

    let maxArea = 0;

    const stack = [];

    for(let i = 0; i < heights.length; i++) {

        const currentHeight = heights[i];
        let startIndex = i;

        while(stack.length && stack[stack.length -1][0] > currentHeight) {
            const [height, index] = stack.pop();
            maxArea = Math.max(maxArea, height * (i - index));
            startIndex = index;
        }

        stack.push([currentHeight, startIndex]);

    }

    while(stack.length) {
        const [height, index] = stack.pop();
        maxArea = Math.max(maxArea, height * (heights.length - index));
    }

    return maxArea;
    
};