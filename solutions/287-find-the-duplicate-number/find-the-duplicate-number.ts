function findDuplicate(nums: number[]): number {

    // Phase One: Find the Meeting Point
    let slow = 0;
    let fast = 0;
    while(true) {
        slow = nums[slow];
        fast = nums[nums[fast]];
        if(slow === fast) {
            // found the meeting point
            break;
        }
    }

    // Phase Two: Find the beginning of the cycle
    let left = 0;
    let right = slow;
    while(left !== right) {
        left = nums[left];
        right = nums[right];
    }

    // both left and right point at the beginning of the cycle
    return left;
};