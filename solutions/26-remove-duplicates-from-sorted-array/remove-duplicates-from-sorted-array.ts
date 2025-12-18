function removeDuplicates(nums: number[]): number {

    let k = nums.length;

    let i = 1;
    while(i < k) {
        
        // while prev is a duplicate of curr
        while(i < k && nums[i - 1] === nums[i]) {

            for(let j = i; j < k - 1; j += 1) {
                nums[j] = nums[j + 1];
            }

            k -= 1;

        }

        i += 1;

    }

    return k;
    
};