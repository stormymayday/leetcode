function getConcatenation(nums: number[]): number[] {
    
    const n = nums.length;
    
    const res: number[] = new Array(n * 2);

    for(let i = 0; i < n; i += 1) {

        res[i] = nums[i];
        res[i + n] = nums[i];

    }

    return res;

};