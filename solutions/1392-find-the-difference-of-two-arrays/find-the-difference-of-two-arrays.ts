function findDifference(nums1: number[], nums2: number[]): number[][] {

    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    const answer1 = [];

    for(const num of set1) {
        if(!set2.has(num)) {
            // num is not set2
            answer1.push(num);
        } else {
            // num is in set2
            set2.delete(num);
        }
    }

    return [answer1, Array.from(set2)];
    
};