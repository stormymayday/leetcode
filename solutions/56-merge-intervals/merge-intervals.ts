function merge(intervals: number[][]): number[][] {
    
    const n = intervals.length;

    intervals.sort((a, b) => a[0] - b[0]);

    const res = [];

    for(let i = 0; i < n; i += 1) {

        const curr = intervals[i];
        
        // Res is empty OR there is no overlap (curr's 'start' is strictly greater than prev's 'end')
        if(res.length === 0 || res[res.length - 1][1] < curr[0]) {
            // push current
            res.push(curr);
        }

        // Otherwise, merge with prev
        res[res.length - 1][1] = Math.max(res[res.length - 1][1], curr[1]);

    }

    return res;

};