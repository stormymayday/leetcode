function missingNumber(nums: number[]): number {
    
    const hashArray: number[] = new Array(nums.length + 1).fill(0);

    for(let i = 0; i < nums.length; i += 1) {
        hashArray[nums[i]] = 1;;
    }

    for(let i = 0; i < hashArray.length; i += 1) {
        if(hashArray[i] === 0) {
            return i;
        }
    }

    return -Infinity;

};