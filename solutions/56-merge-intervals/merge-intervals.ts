function merge(intervals: number[][]): number[][] {
    // Edge Cases: empty array or single interval
    if(intervals.length === 0 || intervals.length === 1) {
        return intervals;
    }

    // Sort intervals by start time to ensure we can process them sequentially
    intervals.sort((a, b) => a[0] - b[0]);

    // Initialize with the first interval
    let currentInterval = intervals[0];

    const result: number[][] = [];
    
    // Start at index 1 since we've already initialized with intervals[0]
    for(let i = 1; i < intervals.length; i++) {
        // Check if current interval overlaps with the next interval
        // An overlap occurs when the end of current interval >= start of next interval
        if(currentInterval[1] >= intervals[i][0]) {
            // Expand the current interval to include the overlapping interval
            // We take the maximum of the two end values to ensure we cover the full range
            currentInterval[1] = Math.max(currentInterval[1], intervals[i][1]);
        } else {
            // No overlap, so add current interval to our result
            result.push(currentInterval);

            // Start a new current interval
            currentInterval = intervals[i];
        }
    }

    // Don't forget to add the last merged interval
    // This is the final interval we were processing when the loop ended
    result.push(currentInterval);

    return result;
};