/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {

    if (nums.length === 0 || nums.length === 1) {
        return;
    }

    let left = 0;
    while (left < nums.length) {

        // find 'zero'
        while (left < nums.length && nums[left] !== 0) {
            left += 1;
        }
        // now 'left' should be pointing at 'zero'

        // initialize 'temp' next to 'left' and find a non-zero
        let temp = left + 1;
        while (temp < nums.length && nums[temp] === 0) {
            temp += 1;
        }
        // now 'temp' should ge pointing at a 'non-zero'

        // swap values
        if(left < nums.length && nums[left] === 0 && temp < nums.length && nums[temp] !== 0) {
            nums[left] = nums[temp];
            nums[temp] = 0;
            // left += 1;
        }

        left += 1;


    }

};