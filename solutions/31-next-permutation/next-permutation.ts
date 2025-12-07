/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {

    const numBackwards: number[] = [];

    // 1. Going backwards, copy values until a greater value is found
    let idx = nums.length - 1;
    outer: while (idx >= 0) {

        const currVal = nums[idx];

        for (let i = 0; i < numBackwards.length; i += 1) {
            // Found greater!
            if (currVal < numBackwards[i]) {
                // swap with smallest number that is greater than currVal and break
                nums[idx] = numBackwards[i];
                numBackwards[i] = currVal;
                break outer;
            }

        }

        // If there is no greater value, copy 'currVal'
        numBackwards.push(currVal);

        // Move to next iteration
        idx -= 1;

    }

    // 2. Fill with sorted
    if(idx < 0) {
        idx = 0;
    } else {
        idx += 1;
    }
    numBackwards.sort((a, b) => a - b);
    for(let i = 0; i < numBackwards.length; i += 1) {
        nums[idx] = numBackwards[i];
        idx += 1;
    }

};