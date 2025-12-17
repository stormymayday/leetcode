function findNumbers(nums: number[]): number {

    const n = nums.length;

    let count = 0;

    for (let i = 0; i < n; i += 1) {

        const curr = nums[i];

        if (1 <= curr && curr <= 9) {
            continue;
        } else if(10 <= curr && curr <= 99) {
            count += 1;
        } else if(100 <= curr && curr <= 999) {
            continue;
        } else if(1000 <= curr && curr <= 9999) {
            count += 1;
        } else if(10000 <= curr && curr <= 99999) {
            continue;
        } else {
            // max is 10^5 = 100000
            count += 1;
        }
        
    }

    return count;

};