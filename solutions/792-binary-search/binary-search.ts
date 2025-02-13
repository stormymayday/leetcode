function search(nums: number[], target: number): number {

    if(!nums.length || target < nums[0] || target > nums[nums.length -1]) {
        return -1;
    }

    let left = 0;
    let right = nums.length - 1;

    while(left <= right) {
        
        let middle = Math.floor((left + right) / 2);

        if(target === nums[middle]) {
            return middle;
        } else if(target < nums[middle]) {
            right = middle - 1;
        } else {
            left = middle + 1;
        }

    }

    return -1;
};