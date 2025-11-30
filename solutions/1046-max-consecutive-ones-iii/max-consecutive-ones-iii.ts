function longestOnes(nums: number[], k: number): number {

    let longest = 0;

    let left = 0;

    let numZeroes = 0; // should not exceed k

    for (let right = 0; right < nums.length; right += 1) {

        if (nums[right] === 0) {

            numZeroes += 1;
        }

        if (numZeroes > k) {

            if (nums[left] === 0) {
                numZeroes -= 1;
            }

            // dragging 'left'
            left += 1;

        }

        if (numZeroes <= k) {
            longest = Math.max(longest, right - left + 1);
        }

    }

    return longest;

};