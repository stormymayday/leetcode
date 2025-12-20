function thirdMax(nums: number[]): number {

    let firstMax = -Infinity;
    let secondMax = -Infinity;
    let thirdMax = -Infinity;

    for (let i = 0; i < nums.length; i += 1) {

        const curr = nums[i];

        if (firstMax < curr) {

            thirdMax = secondMax;
            secondMax = firstMax;
            firstMax = curr;

        } else if (
            secondMax < curr
            && curr !== firstMax
        ) {

            thirdMax = secondMax;
            secondMax = curr;

        } else if (
            thirdMax < curr
            && curr !== firstMax
            && curr !== secondMax
        ) {

            thirdMax = curr;

        }

    }

    if (thirdMax !== -Infinity) {
        return thirdMax;
    }
    // Edge Case: If thirdMax is -Infinity, skip secondMax and jump straight to firstMax
    // else if (secondMax !== -Infinity) {
    //     return secondMax;
    // } 
    else {
        return firstMax;
    }

};