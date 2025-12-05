function twoSum(nums: number[], target: number): number[] {

    const res: number[] = [];

    for(let i = 0; i < nums.length; i += 1) {
        for(let j = i + 1; j < nums.length; j += 1) {
            if(nums[i] + nums[j] === target) {
                res[0] = i;
                res[1] = j;
                break;
            }
        }
    }

    return res;
    
};