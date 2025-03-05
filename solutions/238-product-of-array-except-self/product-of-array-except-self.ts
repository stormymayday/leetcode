function productExceptSelf(nums: number[]): number[] {

    const length = nums.length;

    const result = new Array(length).fill(1);

    let prefix = 1;
    for(let i = 0; i < length; i++) {
        result[i] = prefix;
        prefix *= nums[i];
    }

    let postfix = 1;
    for(let i = length - 1; i >= 0; i--) {
        result[i] *= postfix;
        postfix *= nums[i];
    }

    return result;
    
};