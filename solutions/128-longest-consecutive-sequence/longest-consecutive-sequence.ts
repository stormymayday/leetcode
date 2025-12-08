function longestConsecutive(nums: number[]): number {

    // Edge Case: empty input
    if(nums.length === 0) {
        return 0;
    }

    const set = new Set<number>(nums);

    let maxStreak = 1;
    for(const curr of set) {
        // "Look Back": check if there is a value one less that current
        if(set.has(curr - 1)) {
            continue;
        } 
        // There is not, try forming a sequence
        else {
            let next = curr + 1;
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