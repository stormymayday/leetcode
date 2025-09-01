function topKFrequent(nums: number[], k: number): number[] {

    // 1. Create a frequency count hash map
    const freqMap = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
    }

    // 2. Initialize a (naive) min priority queue
    const minHeap: [number, number][] = [];
    for(const [num, count] of freqMap.entries()) {
        if(minHeap.length < k) {
            minHeap.push([num, count]);
            minHeap.sort((a, b) => a[1] - b[1]);
        } else {
            if(count > minHeap[0][1]) {
                minHeap.shift();
                minHeap.push([num, count]);
                minHeap.sort((a, b) => a[1] - b[1]);
            }
        }
        
    }

    // 3. Get Top K Frequent Elements
    const res: number[] = [];
    while(minHeap.length > 0) {
        const [topNum, count] = minHeap.shift();
        res.push(topNum);
    }
    return res;
};