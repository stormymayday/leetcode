function removeDuplicates(nums: number[]): number {

    let k = nums.length;

    let i = 0;
    while(i < k) {

        while(i < k - 1 && nums[i] === nums[i + 1]) {

            for(let j = i; j < k -1; j += 1) {

                nums[j] = nums[j  + 1];

            }

            k -= 1;

        }

        i += 1;

    }

    return k;
    
};