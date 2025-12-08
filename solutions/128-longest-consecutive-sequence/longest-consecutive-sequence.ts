function longestConsecutive(nums: number[]): number {

    if(nums.length === 0) {
        return 0;
    }

    const sortedNums = [...nums].sort((a, b) => a - b);

    let maxStreak = 1;
    let currStreak = 1;

    for (let i = 0; i < sortedNums.length - 1; i += 1) {

        // if current + 1 equals to next element
        if (sortedNums[i] + 1 === sortedNums[i + 1]) {
            currStreak += 1;
            maxStreak = Math.max(maxStreak, currStreak);
        }
        else if (sortedNums[i] === sortedNums[i + 1]) {
            continue;
        }
        else {
            currStreak = 1;
        }

    }

    return maxStreak;


};