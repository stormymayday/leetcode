function findMin(nums: number[]): number {

    let left: number = 0;
    let right: number = nums.length - 1;
    let minIdx: number = 0;

    while(left <= right) {
        
        // The entire search space is sorted
        if(nums[left] <= nums[right]) {
            // compare current min to value at 'left' and break
            if(nums[minIdx] > nums[left]) {
                minIdx = left;
            }
            break;
        }

        const mid = left + Math.floor((right - left) / 2);

        // Min update here is not necessary
        // minIdx = mid;

        // If value at 'mid' is greater than value at 'right'
        // Means that the min is somewhere on the right
        // Example: [ 3 4 5 1 2 ]
        //            L   M   R
        // 5 > 2
        // Additional note: mid cannot be the mid
        if(nums[mid] > nums[right]) {
            left = mid + 1;
        } 
        // Otherwise, value at 'mid' is less than OR equal to value at 'right'
        // Therefore, it is a potential min
        else {
            // Since value at 'mid' is a potential min value, record it
            minIdx = mid;
            right = mid - 1;
        }

    }

    return nums[minIdx];
    
};