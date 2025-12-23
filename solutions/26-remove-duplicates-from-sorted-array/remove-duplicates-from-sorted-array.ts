function removeDuplicates(nums: number[]): number {

    let k = nums.length;

    for(let i = nums.length - 2; i >= 0; i -= 1) {

        if(nums[i] === nums[i + 1]) {

            for(let j = i; j < k -1; j += 1) {

                nums[j] = nums[j + 1];

            }

            k -= 1;

        }

    }

    return k;
    
};