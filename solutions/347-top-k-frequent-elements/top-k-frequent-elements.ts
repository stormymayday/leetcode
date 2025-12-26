function topKFrequent(nums: number[], k: number): number[] {

    const freqMap = new Map<number, number>();
    for(let i = 0; i < nums.length; i += 1) {
        freqMap.set(nums[i], (freqMap.get(nums[i]) || 0) + 1);
    }

    const pq: number[][] = [];
    for(const [num, freq] of freqMap.entries()) {
        pq.push([num, freq]);
    }

    pq.sort((a, b) => a[1] - b[1]);

    const res: number[] = [];
    for(let i = pq.length - 1; i > pq.length - 1 - k; i -= 1) {
        res.push(pq[i][0]);
    }
    return res; 
};