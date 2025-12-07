/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {

    const numBackwards: number[] = [];

    // 1. Going backwards, copy values into 'numBackwards' until a greater value is found
    let idx = nums.length - 1;
    outer: while (idx >= 0) {

        const currVal = nums[idx];

        // 1.1. Linear scan 'numBackwards' if there is value greater than 'currVal'
        for (let i = 0; i < numBackwards.length; i += 1) {
            // Found greater!
            if (currVal < numBackwards[i]) {
                // swap and break
                nums[idx] = numBackwards[i];
                numBackwards[i] = currVal;
                break outer;
            }

        }

        // If there is no greater value, copy 'currVal' over to 'numBackwards'
        numBackwards.push(currVal);

        // Move to next iteration
        idx -= 1;

    }

    // 2. Overwrite 'nums' from 'idx + 1' with sorted 'numBackwards'
    numBackwards.sort((a, b) => a - b);
    // 2.1 If 'idx' went out of bounds
    if (idx < 0) {
        // reset it
        idx = 0;
    } else {
        // otherwise, move it forward one spot from the 'swap' position
        idx += 1;
    }
    // 2.2. Overwriting rest of the 'nums' using sorted 'numBackwards' values
    for (let i = 0; i < numBackwards.length; i += 1) {
        nums[idx] = numBackwards[i];
        idx += 1;
    }

};