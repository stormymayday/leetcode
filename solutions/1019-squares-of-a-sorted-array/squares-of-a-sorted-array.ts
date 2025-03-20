function sortedSquares(nums: number[]): number[] {

    const result = [];

    for(let i = 0; i < nums.length; i++) {
        result.push(Math.abs(nums[i])*Math.abs(nums[i]));
    }

    return result.sort((a,b) => a - b);
    
};