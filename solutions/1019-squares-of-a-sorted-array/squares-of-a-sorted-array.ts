function sortedSquares(nums: number[]): number[] {

    const result = [];

    let min = Infinity;
    let minIndex = 0;
    for(let i = 0; i < nums.length; i++) {
        if(min > Math.abs(nums[i])) {
            min = Math.abs(nums[i]);
            minIndex = i;
        }
    }

    result.push(nums[minIndex] * nums[minIndex]);
    let left = minIndex - 1;    
    let right = minIndex + 1;
    while(left >= 0 && right < nums.length) {

        if(Math.abs(nums[left]) < Math.abs(nums[right])) {
            result.push(nums[left] * nums[left]);
            left--;
        } else {
            result.push(nums[right] * nums[right]);
            right++;
        }
    }

    while(left >= 0) {
        result.push(nums[left] * nums[left]);
        left--;
    }

    while(right < nums.length) {
        result.push(nums[right] * nums[right]);
        right++;
    }

    return result;
    
};