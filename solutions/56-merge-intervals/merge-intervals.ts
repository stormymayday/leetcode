function merge(intervals: number[][]): number[][] {

    const n = intervals.length;

    intervals.sort((a, b) => a[0] - b[0]);

    const res = [];

    for (let i = 0; i < n; i += 1) {

        if (res.length > 0 && intervals[i][1] <= res[res.length - 1][1]) {
            continue;
        }

        let start = intervals[i][0];
        let end = intervals[i][1];

        for (let j = i + 1; j < n; j += 1) {

            if (end >= intervals[j][0]) {
                end = Math.max(end, intervals[j][1])
            } else {
                break;
            }

        }

        res.push([start, end]);

    }

    return res;

};