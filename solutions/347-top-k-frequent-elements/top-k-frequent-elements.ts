function topKFrequent(nums: number[], k: number): number[] {
    
    const hashMap: Record<string, number> = {};

    for(let i = 0; i < nums.length; i++) {
        const key = nums[i];
        if(hashMap[key] === undefined) {
            hashMap[key] = 1;
        } else {
            hashMap[key] += 1;
        }
    }

    // Create an array of [number, frequency] pairs and sort by frequency
    const frequency = Object.entries(hashMap);
    frequency.sort((a,b) => {
        return b[1]- a[1];
    });

    const result = [];
    // Extract only the top k frequent numbers
    for(let i = 0; i < k; i++) {
        result.push(Number(frequency[i][0]));
    }

    return result;

};