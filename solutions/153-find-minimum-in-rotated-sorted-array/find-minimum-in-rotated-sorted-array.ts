function findMin(nums: number[]): number {

    let left: number = 0;
    let right: number = nums.length - 1;

    let candidateIdx: number = 0;

    while(left <= right) {

        const mid = left + Math.floor((right - left) / 2);

        // If value at 'mid' is greater than or equals to value at 'left'
        // (equals incase 'mid' and 'left' are the same index)
        if(nums[mid] >= nums[left]) {

            // If value at 'mid' is also greater than value at 'right'
            if(nums[mid] > nums[right]) {
                // then minimum must be to the right
                // discard left
                left = mid + 1;
            }
            // Otherwise, search space must be sorted in sorted order
            // (mid is >= left && mid < right)
            else {

                // compare current value at 'candidateIdx' against value at 'left' and break
                if(nums[left] < nums[candidateIdx]) {
                    candidateIdx = left;
                }
                break;

            }

        } 
        // Otherwise, value at 'mid' is strictly greater than value at 'left'
        else {
            // update candidate / min
            if(nums[candidateIdx] > nums[mid]) {
                candidateIdx = mid;
            }
            // we can always discard right
            right = mid - 1;
        }

    }

    return nums[candidateIdx];
    
};