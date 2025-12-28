function missingNumber(nums: number[]): number {
    
    const sorted = [...nums].sort((a, b) => a - b);

    for(let i = 0; i < nums.length; i += 1) {

        if(i !== sorted[i]) {
            return i;
        }

    }

    return nums.length;

};