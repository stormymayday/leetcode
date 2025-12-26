function topKFrequent(nums: number[], k: number): number[] {

    const freqMap = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
    }

    // Buckets Array (length + 1 to account for index 0 which will not be used)
    const freqArray: number[][] = new Array(nums.length + 1);
    for(let i = 0; i < freqArray.length; i += 1) {
        freqArray[i] = [];
    }
    // Max frequency will not exceed the array length
    // Therefore, we can use indices as the frequency bucket
    for(const [num, freq] of freqMap.entries()) {
        freqArray[freq].push(num);
    }

    const res: number[] = [];
    // Going backwards: numbers with highest frequency will be at the end
    outer: for(let i = freqArray.length - 1; i >= 0; i -= 1) {
        if(freqArray[i].length > 0) {

            for(let j = 0; j < freqArray[i].length; j += 1) {

                res.push(freqArray[i][j]);
                k -= 1;
                if(k === 0) {
                    break outer;
                }

            }

        }
    }
    return res; 
};