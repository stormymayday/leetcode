function merge(intervals: number[][]): number[][] {

    if (intervals.length === 0 || intervals.length === 1) {
        return intervals;
    }

    const n = intervals.length;

    intervals.sort((a, b) => a[0] - b[0]);

    const res = [intervals[0]];

    for (let i = 1; i < n; i += 1) {

        const curr = intervals[i];
        const prev = res[res.length - 1];

        // Overlap
        if (prev[1] >= curr[0]) {
            prev[1] = Math.max(prev[1], curr[1]);
        }
        // No Overlap
        else {
            res.push(curr);
        }

    }

    return res;
};