function merge(intervals: number[][]): number[][] {
    const sorted = intervals.sort((a, b) => {
        return a[0] - b[0];
    });
    const result = [sorted[0]];
    for(let i = 1; i < sorted.length; i += 1) {
        if(result[result.length - 1][1] >= sorted[i][0]) {
            // merge
            if(result[result.length - 1][1] < sorted[i][1]) {
                result[result.length - 1][1] = sorted[i][1];
            }
        } else {
            result.push(sorted[i]);
        }
    }
    return result;
};