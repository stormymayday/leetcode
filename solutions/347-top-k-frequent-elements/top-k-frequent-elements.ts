function topKFrequent(nums: number[], k: number): number[] {

    // 1. Create a frequency count hash map
    const freqMap = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
    }

    // 2. Initialize a (naive) max priority queue
    const maxHeap: [number, number][] = [];
    for(const [num, count] of freqMap.entries()) {
        maxHeap.push([num, count]);
    }
    maxHeap.sort((a, b) => b[1] - a[1]);

    // 3. Get Top K Frequent Elements
    const res: number[] = [];
    while(maxHeap.length > 0) {
        const [topNum, count] = maxHeap.shift();
        res.push(topNum);
        if(res.length === k) {
            break;
        }
    }
    return res;
};