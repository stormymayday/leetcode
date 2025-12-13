function merge(intervals: number[][]): number[][] {

    const n = intervals.length;

    intervals.sort((a, b) => a[0] - b[0]);

    const res = [];
    res.push(intervals[0]);

    for (let i = 1; i < n; i += 1) {

        const curr = intervals[i];

        if (res[res.length - 1][1] >= curr[0] && res[res.length - 1][1] >= curr[1]) {
            continue;
        }
        else if (res[res.length - 1][1] >= curr[0]) {
            res[res.length - 1][1] = curr[1];
        } else {
            res.push(curr);
        }

    }

    return res;

};