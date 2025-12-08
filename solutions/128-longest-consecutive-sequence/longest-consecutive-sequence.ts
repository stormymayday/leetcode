function longestConsecutive(nums: number[]): number {

    // Edge Case: empty input
    if(nums.length === 0) {
        return 0;
    }

    const set = new Set<number>(nums);

    let maxStreak = 1;
    for(const key of set) {
        if(set.has(key - 1)) {
            continue;
        } else {
            let next = key + 1;
            let currStreak = 1;
            while(set.has(next)) {
                currStreak += 1;
                next += 1;
            }
            maxStreak = Math.max(maxStreak, currStreak);
        }
    }
    
    return maxStreak;

};