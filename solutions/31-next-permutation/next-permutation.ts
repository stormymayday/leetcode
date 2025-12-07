/**
 Do not return anything, modify nums in-place instead.
 */
function nextPermutation(nums: number[]): void {

    const numBackwards: number[] = [];

    // 1. Going backwards, copy values into 'numBackwards' until a greater value is found
    let idx = nums.length - 1;
    outer: while (idx >= 0) {

        const currVal = nums[idx];

        // Check numBackwards has value greater than currVal
        // We can check top in O(1) Time
        if (currVal < numBackwards[numBackwards.length - 1]) {
            // If there is a greater value, linear scan 'numBackwards' to find smallest element greater than currVal
            for (let i = 0; i < numBackwards.length; i += 1) {
                // Found greater!
                if (currVal < numBackwards[i]) {
                    // swap and break
                    nums[idx] = numBackwards[i];
                    numBackwards[i] = currVal;
                    break outer;
                }

            }
        }

        // If there is no greater value, copy 'currVal' over to 'numBackwards'
        numBackwards.push(currVal);

        // Move to next iteration
        idx -= 1;

    }

    // 2. Overwrite 'nums' from 'idx + 1' with sorted 'numBackwards'
    numBackwards.sort((a, b) => a - b);
    idx += 1;
    for (let i = 0; i < numBackwards.length; i += 1) {
        nums[idx] = numBackwards[i];
        idx += 1;
    }

};