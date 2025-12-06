function majorityElement(nums: number[]): number {
    
    let maxCount = 0;
    let result = 0;

    for(let i = 0; i < nums.length; i += 1) {
        
        // count the occurence of 'candidate'
        let count = 0;
        const candidate = nums[i];

        for(let j = i; j < nums.length; j += 1) {

            if(nums[j] === candidate) {
                count += 1;
            }

        }

        if(count > maxCount) {
            maxCount = count;
            result = candidate;
        }
    }

    return result;

};