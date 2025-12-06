function majorityElement(nums: number[]): number {
    
    const n = nums.length;
    let maxCount = 0;
    let result = 0;

    outer: for(let i = 0; i < n; i += 1) {
        
        // count the occurence of 'candidate'
        let count = 0;
        const candidate = nums[i];

        for(let j = i; j < n; j += 1) {

            if(nums[j] === candidate) {
                count += 1;
            }

        }

        if(count > Math.floor(n/2)) {
            result = candidate;
            break outer;
        }

        if(count > maxCount) {
            maxCount = count;
            result = candidate;
        }
    }

    return result;

};