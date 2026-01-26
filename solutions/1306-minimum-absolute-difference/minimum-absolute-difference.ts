function minimumAbsDifference(arr: number[]): number[][] {

    let minDiff: number = Infinity;

    const sortedArr = [...arr].sort((a, b) => a - b);
    for (let i = 0; i < sortedArr.length - 1; i += 1) {
        minDiff = Math.min(minDiff, Math.abs(sortedArr[i + 1] - sortedArr[i]));
    }

    const res: number[][] = [];
    for (let i = 0; i < sortedArr.length - 1; i += 1) {
        if (Math.abs(sortedArr[i + 1] - sortedArr[i]) === minDiff) {
            res.push([sortedArr[i], sortedArr[i + 1]])
        }
    }
    return res;
};