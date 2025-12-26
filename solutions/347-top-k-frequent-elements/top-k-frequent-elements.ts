function topKFrequent(nums: number[], k: number): number[] {

    const freqMap = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
    }

    const pq: number[][] = [];
    for(const [num, freq] of freqMap.entries()) {
        pq.push([num, freq]);
    }

    pq.sort((a, b) => b[1] - a[1]);

    while(pq.length > k) {
        pq.pop();
    }

    const res: number[] = [];
    for(let i = 0; i < pq.length; i += 1) {
        res.push(pq[i][0]);
    }
    return res; 
};