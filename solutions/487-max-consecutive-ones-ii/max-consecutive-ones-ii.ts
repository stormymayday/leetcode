function findMaxConsecutiveOnes(nums: number[]): number {

    const n = nums.length;

    let max = 0;

    for (let i = 0; i < n; i += 1) {

        let currMax = 0;
        let flipsAllowed = 1;

        for (let j = i; j < n; j += 1) {

            if (nums[j] === 1) {
                currMax += 1;
                max = Math.max(max, currMax);
            } else {

                if (flipsAllowed !== 0) {
                    currMax += 1;
                    max = Math.max(max, currMax);
                    flipsAllowed -= 1;
                } else {
                    break;
                }

            }

        }

    }

    return max;

};