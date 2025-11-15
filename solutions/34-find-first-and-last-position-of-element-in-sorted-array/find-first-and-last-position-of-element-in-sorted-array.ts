function searchRange(nums: number[], target: number): number[] {

    const res: [number, number] = [-1, -1];

    // Lower Bound
    let left: number = 0;
    let right: number = nums.length - 1;
    while(left <= right) {

        const mid = left + Math.floor((right - left)/2);

        if(target > nums[mid]) {
            // discard left
            left = mid + 1;
        } else if(target < nums[mid]) {
            // discard right
            right = mid - 1;
        } else {
            // found target
            // save candidate idx
            res[0] = mid;
            // Keep searching left
            right = mid - 1;
        }

    }

    // Upper Bound
    if(res[0] !== -1) {

        left = res[0];
        right = nums.length - 1;
        while(left <= right) {

            const mid = left + Math.floor((right - left) / 2);

            if(target > nums[mid]) {
                // discard left
                left = mid + 1;
            } else if(target < nums[mid]) {
                // discard right
                right = mid - 1;
            } else {
                // found target
                // save candidate idx
                res[1] = mid;
                // keep searching right
                left = mid + 1;
            }
        }

    }

    return res;
    
};