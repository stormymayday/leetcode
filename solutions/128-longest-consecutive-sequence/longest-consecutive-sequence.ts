function longestConsecutive(nums: number[]): number {

    // Edge Case: empty input
    if(nums.length === 0) {
        return 0;
    }

    const uniqueSortedNums = [...new Set(nums)].sort((a, b) => a - b);

    let maxStreak = 1;
    let currStreak = 1;

    for (let i = 0; i < uniqueSortedNums.length - 1; i += 1) {

        // if current + 1 equals to next element
        if (uniqueSortedNums[i] + 1 === uniqueSortedNums[i + 1]) {
            currStreak += 1;
            maxStreak = Math.max(maxStreak, currStreak);
        }
        // not an exact increment by 1
        else {
            currStreak = 1; // reseting current streak
        }

    }

    return maxStreak;

};