function longestOnes(nums: number[], k: number): number {

    let longest = 0;

    let left = 0;
    // let currStreak = 0;

    let numZeroes = 0; // should not exceed k

    // let idxOfFirstZero = -1;

    for(let right = 0; right < nums.length; right += 1) {

        if(nums[right] === 0) {

            numZeroes += 1;

            if(numZeroes > k) {
                
                // move left to the first occurence of zero
                while(nums[left] !== 0) {
                    left += 1;
                }

                // now move it 1 spot forward
                left += 1;
                numZeroes -= 1;

            }

        }

        longest = Math.max(longest, right - left + 1);

    }

    return longest;
    
};