function search(nums: number[], target: number): number {

    let left: number = 0;
    let right: number = nums.length - 1;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        if(target === nums[mid]) {
            return mid;
        }

        // value at 'mid' is greater than value at 'left'
        if(nums[left] <= nums[mid]) {

            if(
                // target is less than valie at 'mid' AND 'left'
                (target < nums[mid] && target < nums[left]) ||
                // OR target is greater than value at 'mid'
                target > nums[mid]
                ) {
                // discard left
                left = mid + 1;
            } 
            // Otherwise, target must be less than value at 'mid' AND
            // greater than or equals to value at 'left'
            // (typing it out for clarity)
            // Note: it is strictly less than value at mid because it eqality is check
            else if(target < nums[mid] && target >= nums[left]) {
                // discard right
                right = mid - 1;
            }

        } 
        // value at 'mid' is less than value at 'left'
        // everything on the 'right' is greater than 'mid'?
        else {

            if(target < nums[mid] || target > nums[mid] && target > nums[right]) {
                // discard right
                right = mid - 1;
            } else if(target > nums[mid]) {
                // discard left
                left = mid + 1;
            }

            // if(target > nums[mid] && target <= nums[right]) {
            //     // discard left
            //     left = mid + 1;
            // } else if(target > nums[mid]) {
            //     // discard right
            //     right = mid - 1;
            // }

        }

    }

    return -1;
    
};