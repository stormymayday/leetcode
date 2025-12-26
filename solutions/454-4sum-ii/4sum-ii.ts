function fourSumCount(nums1: number[], nums2: number[], nums3: number[], nums4: number[]): number {

    const n = nums1.length;

    const twoSumCount1 = new Map<number, number>(); // key: sum of nums1 and nums2, value: count
    const twoSumCount2 = new Map<number, number>(); // key: sum of nums3 and nums4, value: count

    for (let a = 0; a < n; a += 1) {

        for (let b = 0; b < n; b += 1) {

            const sum1 = nums1[a] + nums2[b];
            twoSumCount1.set(sum1, (twoSumCount1.get(sum1) || 0) + 1);

            const sum2 = nums3[a] + nums4[b];
            twoSumCount2.set(sum2, (twoSumCount2.get(sum2) || 0) + 1);

        }

    }

    let count = 0;

    for(const [sum, sumCount] of twoSumCount1.entries()) {

        if(twoSumCount2.has(-sum)) {
            // Note: need to multiply the counts, not add them. 
            // Example: If sum 's' appears 3 times in arrays 1 & 2, and '-s' appears 2 times in arrays 3 & 4
            // you have 3 × 2 = 6 valid tuples, not 3 + 2 = 5.
            count += (sumCount * twoSumCount2.get(-sum));
        }

    }
 
    return count;

};