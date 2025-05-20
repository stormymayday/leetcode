function decompressRLElist(nums: number[]): number[] {

    const result = [];

    let left = 0;
    let right = 1;
    while(right < nums.length) {

        const count = nums[left];
        const num = nums[right];

        for(let i = 0; i < count; i++) {
            result.push(num);
        }
        
        left += 2;
        right += 2;
    }

    return result;
    
};