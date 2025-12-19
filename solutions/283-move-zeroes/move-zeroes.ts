/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {

    const n = nums.length;

    let i = 0;
    outer: while(i < n) {

        if(nums[i] === 0) {

            // Scan forward for the next non zero
            let j = i + 1;
            while(nums[j] === 0) {
                j += 1;
            }

            if(j < n && nums[j] !== 0) {

                nums[i] = nums[j];
                nums[j] = 0;

            } else {
                // There are only zeroes
                break outer;
            }

        }

        i += 1;

    }
    
};